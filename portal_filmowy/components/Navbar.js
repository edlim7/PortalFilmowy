import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../contexts/AppContext";
const Navbar = () => {
	const { Menu, setMenu } = useContext(AppContext);
	console.log(Menu);
	return (
		<Container>
			<div>
				<center>
					<h1>Filizone</h1>
				</center>
				<button className="Login">
					{" "}
					{/* onClick={}, pojawia sie "plansza" cos i tam wpisujesz login i haslo */}
					Logowanie
				</button>
				<button className="Register">
					{" "}
					{/* onClick={} */}
					Rejestracja
				</button>
			</div>

			<br />
			<center>
				<ul>
					<Link href="/filmy">Filmy</Link>
					<Link href="/seriale">Seriale</Link>
					<Link href="/RankingFilmow">Ranking Filmów</Link>
					<Link href="/RankingSeriali">Ranking Seriali</Link>
				</ul>
			</center>
		</Container>
	);
};

export default Navbar;
const Container = styled.div`
	background-color: gray;
`;
