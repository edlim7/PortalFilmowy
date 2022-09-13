import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";

const MovieModal = () => {
  const {showModalMovie, setShowModalMovie, movie} = useContext(ModalContext);
  return (
    <>
{showModalMovie ? (
				<Background onClick={() => setShowModalMovie((prevState) => !prevState)}>
					<Wrapper onClick={(e) => e.stopPropagation()}>
						<Content>
							<p> Nazwa filmu to:  {movie.nazwa}</p>
							<p> Ilość oskarów: {movie.oskary}</p>
							<p>Koment: {movie.komentarze.map((post)=><p> UserID: {post.uzytkownikID} Tresc: {post.tresc}<button>delete</button></p>)} </p>
						</Content>
          </Wrapper>
        </Background>
    
  ): null}
  </>
);
};

const Background = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	background-color: #00000030;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
`;

const Wrapper = styled.div`
	width: 700px;
	height: 700px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
	background: white;
	color: #000;
	display: flex;
	position: relative;
	z-index: 99;
	border-radius: 10px;

`
const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #141414;
	p {
		flex: 1 0;
		font-size: inherit;
		background-color: transparent;
		font-size: 1.3rem;
		color: #ca3063;
		transition: 0.5s all ease-out;
	}
	button {
		padding: 10px 24px;
		background: #141414;
		color: #ffff;
		border: none;
	}
`;

export default MovieModal