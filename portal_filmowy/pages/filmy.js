import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Footer from "../components/Footer";
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch("http://localhost:5000/api/ProdukcjaKontroler/getAllProdukcja");
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
const [dataValues, setDataValues] = useState(posts);

	return (
		<>
			<Navbar></Navbar>
			<Search></Search>
		<ul>
      {dataValues.map((post) => (
				<li key={post.produkcjaId}>{post.nazwa}</li>
      ))}
    </ul>
			<Footer></Footer>
		</>
	);
};

export default Filmy;
