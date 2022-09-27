import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";
import { AppContext } from "../contexts/AppContext";
import { Formik, Form, Field } from 'formik';
const AddMovieModal = () => {
  const {showAddModalMovie, setShowAddModalMovie, addMovie} = useContext(ModalContext);
	const {Kategoria} = useContext(AppContext);
	console.log("zz",Kategoria);
	async function postKom(url, data) {
		const res = await fetch(url, {
			method:'POST',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({nazwa:data.nazwa, opis: data.opis, zdjecie: data.zdjecie, kategoria: data.kategoria, edukacyjny: data.edukacyjny, oskary: data.oskary })
		});
		return res.json()
	}
  return (
    <>
{showAddModalMovie ? (
				<Background onClick={() => setShowAddModalMovie((prevState) => !prevState)}>
					<Wrapper onClick={(e) => e.stopPropagation()}>
						<Content>
							<h1>Dodaj nowy film</h1>
							<Formik initialValues={{nazwa: "", opis: "", zdjecie: "", kategoria: "fantasty", edukacyjny: "", oskary: 0}} onSubmit={(values) => postOcena('https://localhost:5001/api/FilmKontroler/addFilm2', 
							values)
							.then((data)=> console.log(data))
							.catch((error)=>console.log(error)) }>
				{({}) => (
								<Form>
									Nazwa filmu: <Field type ='nazwa' name='nazwa' ></Field><br /><br />
									Opis: <Field type ='opis' name='opis'  ></Field><br /><br />
									Zdjęcie: <Field type ='zdjecie' name='zdjecie' value="obrazki/"></Field><br /><br />

									Kategoria:    <Field as="select" name="kategoria">
			 {Kategoria.map((post) => (
									<option value={post.kategoriaId}>{post.nazwaKategorii}</option>
									))}
           </Field> 
									
								
									Edukacyjny: Tak<Field type ='radio' name='edukacyjny' value='1' ></Field> 	{/*konwersja */}
									Nie 		   <Field type ='radio' name='edukacyjny' value='1' checked></Field><br /><br /> 

									Ilość oskarów: <Field type ='number' name='oskary' min='0' max='100' ></Field><br />									
									<center><button type='submit'>Dodaj!</button></center>
								</Form>
								 )}
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
`;

const Wrapper = styled.div`
	width: 700px;
	height: 700px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
	background: #DED7DE;
	color: #000;
	position: absolute;
	z-index: 1000;
	border-radius: 10px;
`

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: left;
	padding-left: 5px;
	color: #141414;
	h1{
		text-align: center;
	}
	p {
		font-weight: bold;
		flex: 1 0;
		font-size: inherit;
		background-color: transparent;
		font-size: 1.3rem;
		color: black;
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
		padding: 15px 40px;	
	}
	button:hover{
		transition-duration: 1s;
   		 background-color: rgb(105, 105, 105);
	}
	input{
		font: inherit;
		background-color: #f1e1fc;
		color: #38015c;
		border-radius: 4px;
		border: 1px solid #f1e1fc;
		text-align: left;
		padding: 0.25rem;	
	}
	.admin{
		color:#ca3063;
	}
	.personel{
		color:darkblue;
	}
	li{
		list-style-type: none;
	}
	hr{
		position: absolute;
		left:7%;
		width:50%;
	}
	.ocenienanie{

	}
`;

export default AddMovieModal