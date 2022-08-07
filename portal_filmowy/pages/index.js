import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Footer from "../components/Footer";
import https from 'https'
const agent = new https.Agent({
  rejectUnauthorized: false
})




export default function Home() {
	return (
		<>
			<Navbar></Navbar>
			<Search></Search>
			<Footer></Footer>
		</>
	);
}
