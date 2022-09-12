import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Footer from "../components/Footer";
import SingleContent from "../components/SingleContent/SingleContent";
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch("http://localhost:5000/api/SerialKontroler/getAllSerial"); // odkryc musze jeszcze jak przekazac obiekt zeby nie byl null i bedzie essasito
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
const Seriale = ({posts}) => {
	const [dataValues, setDataValues] = useState(posts);
	console.log("nowe"); 
	console.log(dataValues);
	
	return (
		<>
			<Navbar></Navbar>
			<Search></Search>
			{dataValues.map((post)=>(
				<SingleContent key={post.id} odcinki={post.odcinki} />
			))}
			<Footer></Footer>
		</>
	);
};

export default Seriale;
