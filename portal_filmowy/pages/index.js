import React, {useState, useEffect, isValidElement, useContext} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import https from 'https';
import SingleContent from "../components/SingleContent/SingleContent";
import SeriesModal from "../components/SeriesModal";
import { ModalContext } from "../contexts/ModalContext";
import { AppContext } from "../contexts/AppContext";

import MovieModal from "../components/MovieModal";
const agent = new https.Agent({
  rejectUnauthorized: false
})
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch("http://localhost:5000/api/ProdukcjaKontroler/getAllProdukcja"); //getSerialKategoria | getAllSerial | http://localhost:5000/api/OcenaKontroler/getAllOcena
	const res2 = await fetch("http://localhost:5000/api/OcenaKontroler/getAllOcena"); //ProdukcjaKontroler/getAllProdukcja
	const res3 = await fetch("http://localhost:5000/api/KategoriaKontroler/getAllKategoria"); 
	const res4 = await fetch("http://localhost:5000/api/FilmKontroler/getFilmProdukcja"); 
	const res5 = await fetch("http://localhost:5000/api/SerialKontroler/getSerialKategoria"); 
	const res6 = await fetch("http://localhost:5000/api/KomentarzKontroler/getAllKomentarz"); 
	const res7 = await fetch("http://localhost:5000/api/UzytkownikKontroler/getAllUzytkownik");
	const posts = await res.json();		//SerialKontroler/getSerialKategoria
	const posts2 = await res2.json();
	const posts3 = await res3.json();
	const posts4 = await res4.json();
	const posts5 = await res5.json();
	const posts6 = await res6.json();
	const posts7 = await res7.json();
	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			posts,
			posts2,
			posts3,
			posts4,
			posts5,
			posts6,
			posts7,
		},
		revalidate: 3,
	};
}
const Home= ({posts,posts2,posts3,posts4,posts5,posts6,posts7}) => {
	const {searchTerm, setSearchTerm} = useContext(AppContext);
	useEffect(() => {
		setSearchTerm('');
	}, [])
	const {showModalSeries,setShowModalSeries, series, setSeries} = useContext(ModalContext);
	const {showModalMovie,setShowModalMovie, movie, setMovie} = useContext(ModalContext)
	const [dataValues, setDataValues] = useState(posts); //produkcja
	const [dataValues2, setDataValues2] = useState(posts2); // ocena
	const [dataValues3, setDataValues3] = useState(posts3); // kategoria
	const [dataValues4, setDataValues4] = useState(posts4); // film
	const [dataValues5, setDataValues5] = useState(posts5);  //serial
	const [dataValues6, setDataValues6] = useState(posts6); // film
	const [dataValues7, setDataValues7] = useState(posts7);  //serial
	const [ZalogowanyUzytkownik, setZalogowanyUzytkownik]= useState([]);
	useEffect(() => {
		const ZalogowanyUzytkownik = JSON.parse(localStorage.getItem('uzytkownik'));
		if (ZalogowanyUzytkownik) {
			setZalogowanyUzytkownik(ZalogowanyUzytkownik);
		}
	  }, []);
	const {setKategoria, Kategoria} = useContext(AppContext);
	useEffect(() => {
		setKategoria(posts3);
	}, [])
	const {setUzytkownicy, Uzyytkownicy} = useContext(AppContext);
	useEffect(() => {
		setUzytkownicy(posts7);
	}, [])
	const {Oceny, setOceny} = useContext(AppContext);
	useEffect(() => {
		setOceny(posts2);
	}, [])
	var userid=ZalogowanyUzytkownik.uzytkownikId;										// tu bedzie uzytkownik
	var licznikKategorii=0;
	const ocenioneProdukcje=[];
	const policzoneKategorie=[];
	var polecane=dataValues;
	var edukacyjnePolecane=dataValues;
	var sum=0;
	var counter=0;
	var komentarz=[];
	var test=[];
	var eduOcena=[];
	var serialFilm=[];
	var serialFilmEdu=[];
	dataValues2.forEach((el)=>{			// wyszukanie ocenionych produkcji przez danego uzytkownika
		if(el.uzytkownikID==userid)
		{
			dataValues.forEach((el2)=>{
				if(el.produkcjaId==el2.produkcjaId)
				{				
					ocenioneProdukcje.push(el2);
				}
			})
		}
	})
	dataValues3.forEach((el3)=>{			// Podliczenie ile razy uzytkownik ocenil film dla kazdej kategorii
		ocenioneProdukcje.forEach((el4) => {
			if(el3.kategoriaId==el4.kategoriaId)
			{
				licznikKategorii++;
			}
		})
		policzoneKategorie.push(el3);
		if(licznikKategorii==0)
		el3.Ilosc=0;
		else
		el3.Ilosc=licznikKategorii;
		licznikKategorii=0;
	})
	const sortPoliczoneKategorie = [...policzoneKategorie].sort((a,b)=>b.Ilosc-a.Ilosc);	// sortowanie podliczonych kategorii
	ocenioneProdukcje.forEach((el3)=>{		// polecane produkcje dla uzytkownika
		polecane = polecane.filter(obj => {
			return obj.produkcjaId !== el3.produkcjaId && obj.kategoriaId==sortPoliczoneKategorie[0].kategoriaId;
		})
	})
	polecane.forEach((el)=>{		// liczenie oceny
		dataValues2.forEach((el2)=>{
			if(el2.produkcjaId==el.produkcjaId)
				{
				sum+=el2.liczba;
				counter++;
				}
		})
		test.push(el);
		if(sum==0)
		el.ocena=0;
		else
		el.ocena=sum/counter;
		sum=0;
		counter=0;
	})
   // przypisanie serialu i filmu do produkcji
	test.forEach((el)=>{
		dataValues4.forEach((el2)=>{
			if(el.produkcjaId==el2.produkcjaId)
			{
				el2.ocena=el.ocena
				serialFilm.push(el2);
			}
		})
	})
	test.forEach((el)=>{
		dataValues5.forEach((el2)=>{
			if(el.produkcjaId==el2.produkcjaId)
			{
				el2.ocena=el.ocena
				serialFilm.push(el2);
			}
		})
	})
	const polecaneDesc = [...serialFilm].sort((a,b)=>b.ocena-a.ocena);	//wyswietlanie polecanych od najwyzej ocenianego
	// przypisanie komentarzy do polecanych:
	dataValues6.forEach((el)=>{ //komentarze | przypisanie nazwy uzytkownika do uzytkownika
		dataValues7.forEach((el2)=>{	// uzytkownik
			if(el2.uzytkownikId==el.uzytkownikID) 
				{
					el.nazwaUzytkownika=el2.login;
				}
		})
	})
	polecaneDesc.forEach((el)=>{ 
		dataValues6.forEach((el2)=>{
			if(el2.produkcjaId==el.produkcjaId)
				{
					komentarz.push(el2);
				}
		})
		el.komentarze=komentarz;
		komentarz=[];
		
	})
	// edukacyjne
	ocenioneProdukcje.forEach((el3)=>{		// polecane produkcje dla uzytkownika
		edukacyjnePolecane = edukacyjnePolecane.filter(obj => {
			return obj.produkcjaId !== el3.produkcjaId && obj.edukacyjny==true;			
		})
	})
	edukacyjnePolecane.forEach((el)=>{		// liczenie oceny
		dataValues2.forEach((el2)=>{
			if(el2.produkcjaId==el.produkcjaId)
				{
				sum+=el2.liczba;
				counter++;
				}
		})
		eduOcena.push(el);
		if(sum==0)
		el.ocena=0;
		else
		el.ocena=sum/counter;
		el.ocena=el.ocena.toFixed(2);
		sum=0;
		counter=0;
	})

	eduOcena.forEach((el)=>{
		dataValues4.forEach((el2)=>{
			if(el.produkcjaId==el2.produkcjaId)
			{
				el2.ocena=el.ocena
				serialFilmEdu.push(el2);
			}
		})
	})
	eduOcena.forEach((el)=>{
		dataValues5.forEach((el2)=>{
			if(el.produkcjaId==el2.produkcjaId)
			{
				el2.ocena=el.ocena
				serialFilmEdu.push(el2);
			}
		})
	})
	console.log("eduOcena:")
	console.log(eduOcena);
	dataValues6.forEach((el)=>{ //komentarze | przypisanie nazwy uzytkownika do uzytkownika
		dataValues7.forEach((el2)=>{	// uzytkownik
			if(el2.uzytkownikId==el.uzytkownikID) 
				{
					el.nazwaUzytkownika=el2.login;
				}
		})
	})
	eduOcena.forEach((el)=>{ 
		dataValues6.forEach((el2)=>{
			if(el2.produkcjaId==el.produkcjaId)
				{
					komentarz.push(el2);
				}
		})
		el.komentarze=komentarz;
		komentarz=[];
		
	})
	//serialFilmEdu = serialFilmEdu.sort(() => Math.random()-0.5) // losowanie robi te hydrate
	//console.log("Wymieszane edu");
	//console.log(serialFilmEdu);
	return (
		<>
		<div style={{minHeight:"784px"}}>
		<SeriesModal />
		<MovieModal />
			<Navbar></Navbar>
			<center><h1>Ze względu na to co oglądasz polecamy:</h1></center>
<Container>
			{polecaneDesc.filter((val)=>{
				if(searchTerm==""){
					return val;
				}else if(val.nazwa.toLowerCase().includes(searchTerm.toLowerCase())){
					return val;
				}
			}).map((post) => (
			post.sezony > 0 ? 				
			<ul key={post.id} onClick={()=>{
				setShowModalSeries((prevState) => !prevState);
					setSeries({
						id : post.id,
						nazwa : post.nazwa,
						emmy: post.emmy,
						odcinki : post.odcinki,
						sezony : post.sezony,
						komentarze: post.komentarze,
						produkcjaId:post.produkcjaId,
						ocena:post.ocena,
						zdjecie: post.zdjecie,
						kategoria: post.kategoria,
						serialId:post.serialId,
						edukacyjny:post.edukacyjny,
						opis:post.opis
					})}}>
				<SingleContent key={post.id} nazwa={post.nazwa} zdjecie={post.zdjecie} />
				</ul> : 
				<ul key={post.id} onClick={()=>{setShowModalMovie((prevState) => !prevState);
					setMovie({
						id : post.id,
					nazwa : post.nazwa,
					oskary : post.oskary,
					komentarze: post.komentarze,
					produkcjaId:post.produkcjaId,
					ocena:post.ocena,
					zdjecie: post.zdjecie,
					opis: post.opis,
					kategoria:post.kategoria,
					filmId:post.filmId,
					edukacyjny:post.edukacyjny,
					})}}>
				<SingleContent key={post.id} nazwa={post.nazwa} zdjecie={post.zdjecie} />
				</ul>
			))}
			</Container>


			<center><h1>Polecamy również zapoznać się z mniej popularnymi produkcjami:</h1></center>
<Container>
			{eduOcena.filter((val)=>{
				if(searchTerm==""){
					return val;
				}else if(val.nazwa.toLowerCase().includes(searchTerm.toLowerCase())){
					return val;
				}
			}).map((post) => (
			post.sezony > 0 ? 				
			<ul key={post.id} onClick={()=>{
				setShowModalSeries((prevState) => !prevState);
					setSeries({
						id : post.id,
						nazwa : post.nazwa,
						emmy: post.emmy,
						odcinki : post.odcinki,
						sezony : post.sezony,
						komentarze: post.komentarze,
						produkcjaId:post.produkcjaId,
						ocena:post.ocena,
						zdjecie: post.zdjecie,
						kategoria: post.kategoria,
						serialId:post.serialId,
						edukacyjny:post.edukacyjny,
						opis:post.opis
					})}}>
				<SingleContent key={post.id} nazwa={post.nazwa} zdjecie={post.zdjecie} />
				</ul> : 
				<ul key={post.id} onClick={()=>{setShowModalMovie((prevState) => !prevState);
					setMovie({
						id : post.id,
					nazwa : post.nazwa,
					oskary : post.oskary,
					komentarze: post.komentarze,
					produkcjaId:post.produkcjaId,
					ocena:post.ocena,
					zdjecie: post.zdjecie,
					opis: post.opis,
					kategoria:post.kategoria,
					filmId:post.filmId,
					edukacyjny:post.edukacyjny,
					})}}>
				<SingleContent key={post.id} nazwa={post.nazwa} zdjecie={post.zdjecie} />
				</ul>
			))}</Container>
			</div><Footer></Footer>
		</>
	);
}
export default Home;


const Container = styled.div`
		display: grid;
		margin: auto;
		grid-template-columns: repeat(auto-fit, 550px);
		grid-template-rows: min-content;
`