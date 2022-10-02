import Link from "next/link";
import React, {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";
import { AppContext } from "../contexts/AppContext";
import PanelAdminaModal from "./PanelAdminaModal";
import Logowanie from "./logowanie/Logowanie";
const Navbar = () => {
	const {showPanelAdminaModal, setShowPanelAdminaModal, PanelAdmina, setPanelAdmina} = useContext(ModalContext)
	const { setShowModalLogin } = useContext(ModalContext);
	const [ZalogowanyUzytkownik, setZalogowanyUzytkownik]= useState([]);
	useEffect(() => {
		const ZalogowanyUzytkownik = JSON.parse(localStorage.getItem('uzytkownik'));
		if (ZalogowanyUzytkownik) {
			setZalogowanyUzytkownik(ZalogowanyUzytkownik);
		}
	  }, []);
	function wylogujUzytkownika() {
		localStorage.removeItem('uzytkownik',JSON.stringify());
		window.location.reload(false);
	}
	return (
		<Container>
			<PanelAdminaModal />
			<Logowanie />
			
			<div>
			<h1><center><Link href="/" ><a className="glowna">Filizone</a></Link></center>
			{ZalogowanyUzytkownik.typKonta===undefined ? 
				<button 
				onClick={() => {
				setShowModalLogin((prevState) => !prevState);
				}}
				className="Login"
				>
				Zaloguj się
				</button>
			: 	
				<label><span className="zalogowanyLogin">Zalogowany jako:<br/> {ZalogowanyUzytkownik.login}</span>
				<button onClick={() => {wylogujUzytkownika();}} className="Login">
				Wyloguj się
				</button>
				</label>
			}
			{ZalogowanyUzytkownik.typKonta===1 ?
			<button 
					onClick={() => setShowPanelAdminaModal((prevState) => !prevState)}
					className="Panel"
				>
					Panel admina
			</button>
			:<></>}
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
	right:5px;
	top:10px;
}
.Panel{
	position: absolute;
	right:5px;
	top:50px;
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
.zalogowanyLogin
{
	position: absolute;
	top: 10px;
	left:5px;
	float:left;
	font-size: 18px;
}
`;

