import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../contexts/AppContext";
const Footer = () => {
	const { Menu, setMenu } = useContext(AppContext);
	console.log(Menu);
	return (
		<Container>
			<div>
				=D Autor zera maila zbiera =D telefonu nie odbiera =D 
			</div>

			<br />
			
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
`;
