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
	
	background-color: #A69595;
	left: 0;
	bottom: 0;
	width: 100%;
	text-align: center;
	.foot {
		margin: 1%;
	}
`;
