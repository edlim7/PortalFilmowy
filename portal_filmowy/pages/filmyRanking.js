import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Footer from "../components/Footer";
import SingleContent from "../components/SingleContent/SingleContent";
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch("http://localhost:5000/api/ProdukcjaKontroler/getAllProdukcja");		// pozniej tutaj getallFimy raczej ale mozliwe ze je przerobie jeszcze
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
const FilmyRanking = ({posts}) => {
const [dataValues, setDataValues] = useState(posts);
console.log(dataValues);
	return (
		<>
			<Navbar></Navbar>
			<Search></Search>
			{dataValues.map((post) => (
				<SingleContent key={post.id} nazwa={post.nazwa}  />
      ))}	Rank F
			<Footer></Footer>
		</>
	);
};

export default FilmyRanking;
