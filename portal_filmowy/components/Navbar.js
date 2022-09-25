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
			<h1><center><Link href="/" ><a className="glowna">Filizone</a></Link></center>
			<button 
					onClick={() => setShowModalLogin((prevState) => !prevState)}
					className="Login"
				>
					Zaloguj się
				</button>
			</h1>
			
			</div>
			<center>
			<span className="linki"><Link href="/filmy" ><a className="link1">Filmy</a></Link></span>
			<span className="linki"><Link href="/seriale"><a className="link1">Seriale</a></Link></span>
			<span className="linki"><Link href="/filmyRanking"><a className="link1">Ranking Filmów</a></Link></span>
			<span className="linki"><Link href="/serialeRanking"><a className="link1">Ranking Serialii</a></Link></span>
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
   		 background-color: rgb(105, 105, 105);
	}
.Login{
	position: absolute;
	right:0px;
	top:0px;
}
.linki{
	padding-right: 30px;
}
.link1:link, .link1:visited {
  background-color: black;
  color: white;
  padding: 14px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin-right: 1px;
  border-radius: 5px;
}
.link1:hover, .link1:active {
	transition-duration: 1s;
   	background-color: rgb(105, 105, 105);
}
.glowna{
	text-decoration: none;
	color: black;
}
`;

