import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";
import Logowanie from "./logowanie/Logowanie";

const Navbar = () => {
	const { setShowModalLogin } = useContext(ModalContext);

	return (
		<Container>
			<Logowanie />
			<div>
				<center>
					<h1>Filizone</h1>
				</center>
				<button
					onClick={() => setShowModalLogin((prevState) => !prevState)}
					className="Login"
				>
					Zaloguj się
				</button>
			</div>

			<br />
			<center>
				<ul>
					<Link href="/filmy">Filmy </Link>
					<Link href="/seriale">Seriale </Link>
					<Link href="/filmyRanking">Ranking Filmów </Link>
					<Link href="/serialeRanking">Ranking Serialii</Link>
				</ul>
			</center>
		</Container>
	);
};

export default Navbar;
const Container = styled.div`
	background-color: gray;
`;
