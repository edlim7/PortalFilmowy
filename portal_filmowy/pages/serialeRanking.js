import React, {useState, useEffect, useContext} from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Footer from "../components/Footer";
import SeriesModal from "../components/SeriesModal";
import { ModalContext } from "../contexts/ModalContext";
import SingleContent from "../components/SingleContent/SingleContent";
import styled from "styled-components";
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch("http://localhost:5000/api/SerialKontroler/getSerialKategoria"); 
	const res2 = await fetch("http://localhost:5000/api/OcenaKontroler/getAllOcena"); 
	const res3 = await fetch("http://localhost:5000/api/KomentarzKontroler/getAllKomentarz"); 
	const res4 = await fetch("http://localhost:5000/api/UzytkownikKontroler/getAllUzytkownik");
	const posts = await res.json();		
	const posts2 = await res2.json();
	const posts3 = await res3.json();
	const posts4 = await res4.json();
	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			posts,
			posts2,
			posts3,
			posts4,
		},
		revalidate: 2,
	};
}
const SerialeRanking = ({posts,posts2,posts3,posts4}) => {
	const {showModalSeries,setShowModalSeries, series, setSeries} = useContext(ModalContext)
	const [dataValues, setDataValues] = useState(posts); 
	const [dataValues2, setDataValues2] = useState(posts2);
	const [dataValues3, setDataValues3] = useState(posts3);
	const [dataValues4, setDataValues4] = useState(posts4); 
	console.log("POLICE",dataValues);
	console.log("POLICE2",dataValues2);
	const test=[];
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
		test.push(el);
		if(sum==0)
		el.ocena=0;
		else
		el.ocena=sum/counter;
		sum=0;
		counter=0;
	})
	const testDesc = [...test].sort((a,b)=>b.ocena-a.ocena);
	console.log(testDesc);
	dataValues3.forEach((el)=>{ //komentarze | przypisanie nazwy uzytkownika do uzytkownika
		dataValues4.forEach((el2)=>{	// uzytkownik
			if(el2.uzytkownikId==el.uzytkownikID) 
				{
					el.nazwaUzytkownika=el2.login;
				}
		})
	})
	testDesc.forEach((el)=>{ 
		dataValues3.forEach((el2)=>{
			if(el2.produkcjaId==el.produkcjaId)
				{
					komentarz.push(el2);
				}
		})
		el.komentarze=komentarz;
		komentarz=[];
		
	})
	return (
		<>
		<SeriesModal />
			<Navbar></Navbar>
			<Search></Search>
			{testDesc.map((post) => (
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
					kategoria: post.kategoria
				})}}>
				<SingleContent key={post.id} nazwa={post.nazwa} zdjecie={post.zdjecie} />
				</ul>
      ))}
			<Footer></Footer>
		</>
	);
};

export default SerialeRanking;
