import React, {useState, useEffect, useContext} from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Footer from "../components/Footer";
import MovieModal from "../components/MovieModal";
import { ModalContext } from "../contexts/ModalContext";
import SingleContent from "../components/SingleContent/SingleContent";
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch("http://localhost:5000/api/FilmKontroler/getFilmProdukcja");	// pozniej tutaj getallfilmyale mozliwe ze je przerobie jeszcze
	const res2 = await fetch("http://localhost:5000/api/OcenaKontroler/getAllOcena"); 
	const res3 = await fetch("http://localhost:5000/api/KomentarzKontroler/getAllKomentarz"); 
	const posts = await res.json();
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

const Filmy = ({posts,posts2,posts3}) => {
const {showModalMovie,setShowModalMovie, movie, setMovie} = useContext(ModalContext)
const [dataValues, setDataValues] = useState(posts);
const [dataValues2, setDataValues2] = useState(posts2);
const [dataValues3, setDataValues3] = useState(posts3);
const filmOcena=[];
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
	filmOcena.push(el);
	if(sum==0)
	el.ocena=0;
	else
	el.ocena=sum/counter;
	sum=0;
	counter=0;
})
console.log("filmOcena");
console.log(filmOcena);

filmOcena.forEach((el)=>{
	dataValues3.forEach((el2)=>{
		if(el2.produkcjaId==el.produkcjaId)
			{
				komentarz.push(el2);
			}
	})
	el.komentarze=komentarz;
	komentarz=[];
	
})
console.log("filmOcena z kom");
console.log(filmOcena);

	return (
		<>
			<MovieModal />
			<Navbar></Navbar>
			<Search></Search>
			{filmOcena.map((post) => (
				<ul onClick={() => {setShowModalMovie((prevState) => !prevState);
				setMovie({
					id : post.id,
					nazwa : post.nazwa,
					oskary : post.oskary,
					komentarze: post.komentarze
				})}}>
				<SingleContent key={post.id} nazwa={post.nazwa}  />
				</ul>
      ))}
			
			<Footer></Footer>
		</>
	);
};

export default Filmy;
