import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";
import Logowanie from "./logowanie/Logowanie";
import Rejestracja from "./rejestracja/Rejestracja";
const Navbar = () => {
	const { showModal, setShowModal } = useContext(ModalContext);

	return (
		<Container>
			<Logowanie />

			<div>
				<center>
					<h1>Filizone</h1>
				</center>
				<button
					onClick={() => setShowModal((prevState) => !prevState)}
					className="Login"
				>
					{" "}
					{/* onClick={}, pojawia sie "plansza" cos i tam wpisujesz login i haslo */}
					Logowanie
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
