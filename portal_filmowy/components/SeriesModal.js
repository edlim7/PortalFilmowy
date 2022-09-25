import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";
import { Formik, Form, Field } from 'formik';

const SeriesModal = () => {
  const {showModalSeries, setShowModalSeries, series} = useContext(ModalContext);
	async function postKom(url, data) {
		const res = await fetch(url, {
			method:'POST',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({tresc:data.tresc, produkcjaId: data.id, uzytkownikID: data.name})
		});
		return res.json()
	}
	async function postOcena(url, data) {
		const res = await fetch(url, {
			method:'POST',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({liczba: data.ocea, produkcjaId: data.id, uzytkownikID: data.name})
		});
		return res.json()
	}
  return (
    <>
{showModalSeries ? (
				<Background onClick={() => setShowModalSeries((prevState) => !prevState)}>
					<Wrapper onClick={(e) => e.stopPropagation()}>
						<Content>
							<p class="tytul"> {series.nazwa}</p>
							<p> Emmy: {series.emmy} </p>
							<p> Ilość sezonów: {series.sezony} </p>
							<p> Ilość odcinków: {series.odcinki} </p>
							<p> Ocena: {series.ocena} </p>
							<Formik initialValues={{id: series.produkcjaId, name: 2, oce: 1}} onSubmit={(values) => postOcena('https://localhost:5001/api/OcenaKontroler/addOcena', 
							values)
							.then((data)=> console.log(data))
							.catch((error)=>console.log(error)) }>
								<Form>
									<Field type ='number' name='ocea' min='1' max='10'>
					  				</Field>
									<button type='submit'></button>
								</Form>
							</Formik>
							<p>Koment:</p>  {series.komentarze.map((post)=> 
							<ul key={post.id} >
								<li key={post.id} >
								{post.nazwaUzytkownika}: {post.tresc}
								</li>
							</ul>
							)} 
							<Formik initialValues={{id: series.produkcjaId, name: 1, tresc:''}} onSubmit={(values) => postKom('https://localhost:5001/api/KomentarzKontroler/addKomentarz', 
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
	position: fixed;
	display: flex;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: #00000030;	
	justify-content: center;
	align-items: center;
	z-index: 1000;
	overflow-y: scroll;
`;

const Wrapper = styled.div`
	width: 700px;
	height: 700px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
	background: white;
	color: #000;
	position: absolute;
	z-index: 1000;
	border-radius: 10px;
	overflow-y:scroll; 
`

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: left;
	padding-left: 5px;
	color: #141414;
	
	p {
		flex: 1 0;
		font-size: inherit;
		background-color: transparent;
		font-size: 1.3rem;
		color: #ca3063;
		transition: 0.5s all ease-out;
	}
	.obokTytul{
		text-align: center;
	}
	span.opis{
		float:right;
	}
	img{
		float:left;
		//display: block;  
		//margin-left: auto;  
		//margin-right: auto;
		height: 144px;
		width: 	176px; 
		margin-right: 1px;
   		border-radius: 5px;
	}
	button {
		cursor: pointer;
		background: #141414;
		color: #ffff;
		border: none;
		padding: 9px 24px;
		
	}
	button:hover{
		transition-duration: 1s;
   		 background-color: grey;
	}
	input{
		font: inherit;
		background-color: #f1e1fc;
		color: #38015c;
		border-radius: 4px;
		border: 1px solid white;
		text-align: left;
		padding: 0.25rem;	
	}
`;

export default SeriesModal