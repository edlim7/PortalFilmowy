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
	const posts = await res.json();
	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			posts,
		},
		revalidate: 1,
	};
}
const Filmy = ({posts}) => {
const {showModalMovie,setShowModalMovie, movie, setMovie} = useContext(ModalContext)
const [dataValues, setDataValues] = useState(posts);

	return (
		<>
			<MovieModal />
			<Navbar></Navbar>
			<Search></Search>
			{dataValues.map((post) => (
				<ul onClick={() => {setShowModalMovie((prevState) => !prevState);
				setMovie({
					id : post.id,
					nazwa : post.nazwa,
					oskary : post.oskary
				})}}>
				<SingleContent key={post.id} nazwa={post.nazwa}  />
				</ul>
      ))}
			
			<Footer></Footer>
		</>
	);
};

export default Filmy;
