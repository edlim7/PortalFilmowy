import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";
import { Formik, Form, Field } from 'formik';

const MovieModal = () => {
  const {showModalMovie, setShowModalMovie, movie} = useContext(ModalContext);
	async function postKom(url, data) {
		const res = await fetch(url, {
			method:'POST',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({tresc:data.tresc, produkcjaId: data.id, uzytkownikID: data.name})
		});
		return res.json()
	}
  return (
    <>
{showModalMovie ? (
				<Background onClick={() => setShowModalMovie((prevState) => !prevState)}>
					<Wrapper onClick={(e) => e.stopPropagation()}>
						<Content>
							<p> Nazwa filmu to:  {movie.nazwa}</p>
							<p> Ilość oskarów: {movie.oskary}</p>
							<p>Koment:</p>  {movie.komentarze.map((post)=> 
							<ul key={post.id} >
								<li key={post.id} >
								{post.nazwaUzytkownika}: {post.tresc}
								</li>
							</ul>
							)} 
							<Formik initialValues={{id: movie.produkcjaId, name: 1, tresc:''}} onSubmit={(values) => postKom('https://localhost:5001/api/KomentarzKontroler/addKomentarz', 
							values)
							.then((data)=> console.log(data))
							.catch((error)=>console.log(error)) }>
		
								<Form>
									<Field type='tresc' name='tresc'></Field>
									<button type='submit'></button>
								</Form>
							</Formik>
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