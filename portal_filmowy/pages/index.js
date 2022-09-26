import React, {useState, useEffect, isValidElement, useContext} from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Footer from "../components/Footer";
import https from 'https';
import SingleContent from "../components/SingleContent/SingleContent";
import SeriesModal from "../components/SeriesModal";
import { ModalContext } from "../contexts/ModalContext";
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
	const {showModalSeries,setShowModalSeries, series, setSeries} = useContext(ModalContext);
	const {showModalMovie,setShowModalMovie, movie, setMovie} = useContext(ModalContext)
	const [dataValues, setDataValues] = useState(posts); //produkcja
	const [dataValues2, setDataValues2] = useState(posts2); // ocena
	const [dataValues3, setDataValues3] = useState(posts3); // kategoria
	const [dataValues4, setDataValues4] = useState(posts4); // film
	const [dataValues5, setDataValues5] = useState(posts5);  //serial
	const [dataValues6, setDataValues6] = useState(posts6); // film
	const [dataValues7, setDataValues7] = useState(posts7);  //serial
	console.log("POLICE",dataValues);
	console.log("POLICE2",dataValues2);
	console.log("POLICE3",dataValues3);
	console.log("POLICE4",dataValues4);
	console.log("POLICE5",dataValues5);
	var userid=4;										// tu bedzie uzytkownik
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
	console.log("ocenioneProdukcje:")
	console.log(ocenioneProdukcje);

	ocenioneProdukcje.forEach((el3)=>{		// polecane produkcje dla uzytkownika
		polecane = polecane.filter(obj => {
			return obj.produkcjaId !== el3.produkcjaId && obj.kategoriaId==sortPoliczoneKategorie[0].kategoriaId;
		})
	})
	console.log("polecane:")
	console.log(polecane);
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
	console.log("serialFilm:")
	console.log(serialFilm);

	const polecaneDesc = [...serialFilm].sort((a,b)=>b.ocena-a.ocena);	//wyswietlanie polecanych od najwyzej ocenianego
	console.log("posortowane polecanie");
	console.log(polecaneDesc);
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
	console.log("Edukacujne:")
	console.log(edukacyjnePolecane);
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
	//serialFilmEdu = serialFilmEdu.sort(() => Math.random()-0.5) // losowanie robi te hydrate
	//console.log("Wymieszane edu");
	//console.log(serialFilmEdu);
	return (
		<>
		<SeriesModal />
		<MovieModal />
			<Navbar></Navbar>
			<Search></Search>

			Mainstream:
			{polecaneDesc.map((post) => (
				<ul key={post.id} onClick={() => {{post.sezony ? 
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
						kategoria: post.kategoria
					}) 	:
					setShowModalMovie((prevState) => !prevState);
					setMovie({
						id : post.id,
						nazwa : post.nazwa,
						oskary : post.oskary,
						komentarze: post.komentarze,
						produkcjaId:post.produkcjaId,
						ocena:post.ocena,
						zdjecie: post.zdjecie,
						opis: post.opis,
						kategoria:post.kategoria
					}) }}}>
				<SingleContent key={post.id} nazwa={post.nazwa} zdjecie={post.zdjecie} />
				</ul>
      		))}




			Edukacyjne:
			{eduOcena.map((post) => (
				<ul key={post.id} onClick={() => {{post.sezony ? 
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
						kategoria: post.kategoria
					}) 	:
					setShowModalMovie((prevState) => !prevState);
					setMovie({
						id : post.id,
						nazwa : post.nazwa,
						oskary : post.oskary,
						komentarze: post.komentarze,
						produkcjaId:post.produkcjaId,
						ocena:post.ocena,
						zdjecie: post.zdjecie,
						opis: post.opis,
						kategoria:post.kategoria
					}) }}}>
				<SingleContent key={post.id} nazwa={post.nazwa} zdjecie={post.zdjecie} />
				</ul>
      		))} 
			<Footer></Footer>
		</>
	);
}
export default Home;