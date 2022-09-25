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
			<h1><center>Filizone</center>
			<button 
					onClick={() => setShowModalLogin((prevState) => !prevState)}
					className="Login"
				>
					Zaloguj się
				</button>
			</h1>
			
			</div>
			<center>
			<span className="link"><Link href="/filmy" className="xd">Filmy</Link></span>
			<span className="link"><Link href="/seriale">Seriale</Link></span>
			<span className="link"><Link href="/filmyRanking">Ranking Filmów</Link></span>
			<span className="link"><Link href="/serialeRanking">Ranking Serialii</Link></span>
			</center>
			
		</Container>
	);
};

export default Navbar;
const Container = styled.div`
	background-color: #A69595;
h1{
	position:relative ;
}
button{
	
	border: 1px solid grey; 
	cursor: pointer;
	background: #141414;
	color: #ffff;
	border: none;
	padding: 9px 24px;
	margin-right: 1px;
    border-radius: 5px;
	}
button:hover{
		transition-duration: 1s;
   		 background-color: darkgrey;
	}
.Login{
	position: absolute;
	right:0px;
	top:0px;
}
.link{
	padding-right: 10px;
	border: 1px solid black; 
}
`;

