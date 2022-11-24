import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../contexts/AppContext";
const Footer = () => {
	return (
		<Container>
			<div className="foot">
				<p>Dane kontaktowe</p>
				<p>Imię i nazwisko: Patryk Milde</p>
				<p>Adres email: patrkmilde@poczta</p>
				
			</div>
		</Container>
	);
};

export default Footer;
const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');
	background-color: #6AA8B7;//#A69595;
	left: 0;
	bottom: 0;
	width: 100%;
	text-align: center;
	.foot {
		font-family: 'Roboto';
		margin: 1%;
	}
`;
