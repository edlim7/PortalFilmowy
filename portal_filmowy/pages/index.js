import React, {useState, useEffect, isValidElement} from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Footer from "../components/Footer";
import https from 'https';
import SingleContent from "../components/SingleContent/SingleContent";
const agent = new https.Agent({
  rejectUnauthorized: false
})
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch("http://localhost:5000/api/ProdukcjaKontroler/getAllProdukcja"); //getSerialKategoria | getAllSerial | http://localhost:5000/api/OcenaKontroler/getAllOcena
	const res2 = await fetch("http://localhost:5000/api/OcenaKontroler/getAllOcena"); //ProdukcjaKontroler/getAllProdukcja
	const res3 = await fetch("http://localhost:5000/api/KategoriaKontroler/getAllKategoria"); 
	const posts = await res.json();		//SerialKontroler/getSerialKategoria
	const posts2 = await res2.json();
	const posts3 = await res3.json();
	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			posts,
			posts2,
			posts3,
		},
		revalidate: 3,
	};
}
const Home= ({posts,posts2,posts3}) => {
	const [dataValues, setDataValues] = useState(posts); 
	const [dataValues2, setDataValues2] = useState(posts2); 
	const [dataValues3, setDataValues3] = useState(posts3); 
	console.log("POLICE",dataValues);
	console.log("POLICE2",dataValues2);
	console.log("POLICE3",dataValues3);
	var userid=4;										// tu bedzie uzytkownik
	var licznikKategorii=0;
	const ocenioneProdukcje=[];
	const policzoneKategorie=[];
	var polecane=dataValues;
	var sum=0;
	var counter=0;
	var test=[];
	dataValues2.forEach((el)=>{
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
	dataValues3.forEach((el3)=>{
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
	const sortPoliczoneKategorie = [...policzoneKategorie].sort((a,b)=>b.Ilosc-a.Ilosc);
	console.log("ocenioneProdukcje:")
	console.log(ocenioneProdukcje);
	ocenioneProdukcje.forEach((el3)=>{
		polecane = polecane.filter(obj => {
			return obj.produkcjaId !== el3.produkcjaId && obj.kategoriaId==sortPoliczoneKategorie[0].kategoriaId;
		})
	})
	console.log("polecane:")
	console.log(polecane);
	polecane.forEach((el)=>{
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
	const polecaneDesc = [...test].sort((a,b)=>b.ocena-a.ocena);
	console.log("posortowane polecanie");
	console.log(polecaneDesc);
	return (
		<>
			<Navbar></Navbar>
			<Search></Search>
			Strona główna<br/>
			Mainstream:
			{polecaneDesc.map((post3)=>
			<SingleContent key={post3.id} nazwa={post3.nazwa} ocena={post3.ocena} kategoria={post3.kategoria}/>
			)} 
			<Footer></Footer>
		</>
	);
}
export default Home;