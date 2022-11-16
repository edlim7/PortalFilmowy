import React, {useState, useEffect, useContext} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import SeriesModal from "../components/SeriesModal";
import AddSeriesModal from "../components/AddSeriesModal";
import { ModalContext } from "../contexts/ModalContext";
import { AppContext } from "../contexts/AppContext";
import SingleContent from "../components/SingleContent/SingleContent";

export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch("http://localhost:5000/api/SerialKontroler/getAllSerial");
	const res2 = await fetch("http://localhost:5000/api/OcenaKontroler/getAllOcena"); 
	const res3 = await fetch("http://localhost:5000/api/KomentarzKontroler/getAllKomentarz"); 
	const res4 = await fetch("http://localhost:5000/api/UzytkownikKontroler/getAllUzytkownik");
	const res5 = await fetch("http://localhost:5000/api/KategoriaKontroler/getAllKategoria")
	const posts = await res.json();
	const posts2 = await res2.json();
	const posts3 = await res3.json();
	const posts4 = await res4.json();
	const posts5 = await res5.json();
	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			posts,
			posts2,
			posts3,
			posts4,
			posts5,
		},
		revalidate: 3,
	};
}
const Seriale = ({posts,posts2,posts3,posts4,posts5}) => {
	const {searchTerm, setSearchTerm} = useContext(AppContext);
	useEffect(() => {
		document.title = 'Filizone - seriale';
	  });
	useEffect(() => {
		setSearchTerm('');
	}, [])
	const {showModalSeries,setShowModalSeries, series, setSeries} = useContext(ModalContext)
	const {setShowAddModalSeries} = useContext(ModalContext);
	const [dataValues, setDataValues] = useState(posts);
	const [dataValues2, setDataValues2] = useState(posts2);
	const [dataValues3, setDataValues3] = useState(posts3);
	const [dataValues4, setDataValues4] = useState(posts4);
	const {setUzytkownicy, Uzyytkownicy} = useContext(AppContext);
	const [ZalogowanyUzytkownik, setZalogowanyUzytkownik]= useState([]);
useEffect(() => {
	const ZalogowanyUzytkownik = JSON.parse(localStorage.getItem('uzytkownik'));
	if (ZalogowanyUzytkownik) {
		setZalogowanyUzytkownik(ZalogowanyUzytkownik);
	}
  }, []);
	const {setKategoria, Kategoria} = useContext(AppContext);
	useEffect(() => {
		setKategoria(posts5);
	}, [])
	useEffect(() => {
		setUzytkownicy(posts4);
	}, [])
	const {Oceny, setOceny} = useContext(AppContext);
	useEffect(() => {
		setOceny(posts2);
	}, [])
	const {NazwyProdukcji, setNazwyProdukcji} = useContext(AppContext);
	useEffect(() => {
		setNazwyProdukcji(posts);
	}, [])

	const serialOcena=[];
	var komentarz=[];
	var sum=0;
	var counter=0;
	dataValues.forEach((el)=>{
		dataValues2.forEach((el2)=>{
			if(el2.produkcjaId==el.produkcjaId)
				{
				sum+=el2.liczba;
				counter++;
				}
		})
		serialOcena.push(el);
		if(sum==0)
		el.ocena=0;
		else
		el.ocena=sum/counter;
		el.ocena=el.ocena.toFixed(2);
		sum=0;
		counter=0;
	})
	dataValues3.forEach((el)=>{ //komentarze | przypisanie nazwy uzytkownika do uzytkownika
		dataValues4.forEach((el2)=>{	// uzytkownik
			if(el2.uzytkownikId==el.uzytkownikID) 
				{
					el.nazwaUzytkownika=el2.login;
				}
		})
	})
	serialOcena.forEach((el)=>{ 
		dataValues3.forEach((el2)=>{
			if(el2.produkcjaId==el.produkcjaId)
				{
					komentarz.push(el2);
				}
		})
		el.komentarze=komentarz;
		komentarz=[];
		
	})
	console.log("serialOcena z kom");
	console.log(serialOcena);
	
	return (
		<>
		<div style={{minHeight:"784px"}}>
		<AddSeriesModal />
		<SeriesModal />
			<Navbar></Navbar>
			<Container>
			{ZalogowanyUzytkownik.typKonta==1 || ZalogowanyUzytkownik.typKonta==2 ? 
			<button 
					onClick={() => setShowAddModalSeries((prevState) => !prevState)}
					className="DodajFilm"
				>
					Dodaj Serial
				</button>
			:<></>}
			{serialOcena.filter((val)=>{
				if(searchTerm==""){
					return val;
				}else if(val.nazwa.toLowerCase().includes(searchTerm.toLowerCase())){
					return val;
				}
			}).map((post) => (
				<ul key={post.id} onClick={() => {setShowModalSeries((prevState) => !prevState);
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
					opis:post.opis,
					kategoriaid:post.kategoriaId
				})}}>
				<SingleContent key={post.id} nazwa={post.nazwa} zdjecie={post.zdjecie} />
				</ul>
      ))}</Container>
			</div><Footer></Footer>
		</>
	);
};

export default Seriale;

const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');
font-family: 'Roboto';
position: relative;
padding-left: 100PX;
		display: grid;
		margin: auto;
		grid-template-columns: repeat(auto-fit, 550px);
		grid-template-rows: min-content;
		

.DodajFilm{
	cursor: pointer;
	position: absolute;
	right:0px;
	margin-top: 10px;
	background: #141414;
	color: #ffff;
	border: none;
	padding: 9px 24px;
}
.DodajFilm:hover{
		transition-duration: 1s;
   		 background-color: rgb(105, 105, 105);
	}
`;