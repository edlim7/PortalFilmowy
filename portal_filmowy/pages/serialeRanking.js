import React, {useState, useEffect, isValidElement} from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Footer from "../components/Footer";
import SingleContent from "../components/SingleContent/SingleContent";
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch("http://localhost:5000/api/SerialKontroler/getSerialKategoria"); //getSerialKategoria | getAllSerial | http://localhost:5000/api/OcenaKontroler/getAllOcena
	const res2 = await fetch("http://localhost:5000/api/OcenaKontroler/getAllOcena"); //ProdukcjaKontroler/getAllProdukcja
	const posts = await res.json();		//SerialKontroler/getSerialKategoria
	const posts2 = await res2.json();
	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			posts,
			posts2,
		},
		revalidate: 2,
	};
}
const SerialeRanking = ({posts,posts2}) => {
	const [dataValues, setDataValues] = useState(posts); 
	const [dataValues2, setDataValues2] = useState(posts2); 
	console.log("POLICE",dataValues);
	console.log("POLICE2",dataValues2);
	const test=[];
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

	return (
		<>
			<Navbar></Navbar>
			<Search></Search>
			from serial:
			{dataValues.map((post)=>(
				<SingleContent key={post.id} liczba={post.odcinki} produkcjaid={post.produkcjaid}/>			
			))}
			from liczby:
			{dataValues2.map((post2)=>(
				<SingleContent key={post2.id} liczba={post2.liczba} />//<SingleContent key={post.id} odcinki={post.odcinki} nazwakategorii={post.nazwakategorii} />
			))}
			rank S
			licznik : {counter}
			<br/>
			POLICE:
			{testDesc.map((post3)=>
			<SingleContent key={post3.id} nazwa={post3.nazwa} ocena={post3.ocena} kategoria={post3.kategoria}/>
			)} 
			<Footer></Footer>
		</>
	);
};

export default SerialeRanking;
