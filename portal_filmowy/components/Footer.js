import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../contexts/AppContext";
const Footer = () => {
	return (
		<Container>
			<div className="foot">Za to &#60;br&#62; to zabije</div>
		</Container>
	);
};

export default Footer;
const Container = styled.div`
	background-color: gray;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	text-align: center;
	.foot {
		margin: 1%;
	}
`;
