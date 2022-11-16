import React, { useContext, useEffect, useState,useRef } from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";
import { AppContext } from "../contexts/AppContext";
import { Formik, Form, Field } from 'formik';
const AddMovieModal = () => {
  const {showAddModalMovie, setShowAddModalMovie, addMovie} = useContext(ModalContext);
	const {Kategoria, NazwyProdukcji} = useContext(AppContext);
	var czyWystepujeNazwa=0;
	const radioRef = useRef(null);
	const selectRef = useRef(null);
	const [eduBool, setEduBool] = useState('');
	async function postKom(url, data) {
		const res = await fetch(url, {
			method:'POST',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({nazwa:data.nazw, opis: data.opi, zdjecie: data.zdjeci, kategoriaId: data.kategori, edukacyjny: data.edukacyjn, oskary: data.oskar})
		});
		return res.json()
	}
	const textArea = (props) => (
		<textArea  {...props}>
		</textArea>
	  );

  return (
    <>
{showAddModalMovie ? (
				<Background onClick={() => setShowAddModalMovie((prevState) => !prevState)}>
					<Wrapper onClick={(e) => e.stopPropagation()}>
						<Content>
							<h1>Dodaj nowy film</h1>
							<Formik enableReinitialize initialValues={{nazw: "", opi: "", zdjeci: "", kategori: 1, edukacyjn: false, oskar: 0}} onSubmit={(values) =>{ 
							czyWystepujeNazwa=0;
							NazwyProdukcji.forEach((el)=>{
								if(el.nazwa===values.nazw)
								{
									czyWystepujeNazwa=czyWystepujeNazwa+1;
									alert("Ten nazwa jest zajęta!");	
								}});
							if(czyWystepujeNazwa==0)
							{
							postKom('https://localhost:5001/api/FilmKontroler/addFilm2', 
							values)
							.then((data)=> console.log(data))
							.catch((error)=>console.log(error));
							window.location.reload(false);
							}}}>
									{({ values }) => (
									<Form className="form">
									<label className="tts">Nazwa filmu: </label><Field type ='nazwa' name='nazw' className="field" required ></Field><br /><br />
									Zdjęcie: <Field type ='zdjecie' name='zdjeci' placeholder="obrazki/" className="field" required></Field><br /><br />
									Kategoria:    <Field as="select" name="kategori" className="field">
			 						{Kategoria.map((post) => (
									<option value={post.kategoriaId}>{post.nazwaKategorii}</option>
									))}
           							</Field><br /><br />
									<label>Edukacyjny: <Field type ='checkbox' name='edukacyjn' className="field"></Field> <br /><br /></label>
									Ilość oskarów: <Field type ='number' name='oskar' min='0' max='100' className="field"  required></Field><br />	<br />
									Opis: <Field type ='opis' name='opi' className="nowyOpis" as={textArea} required ></Field><br /><br />								
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
	background: white;
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
	.form{
		@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');
font-family: 'Roboto';
	}
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
		position: absolute;
		left:285px;
		bottom:100px;
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
		border: 2px solid black;
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
	input:focus{
		outline: 1px solid black;
	}
	.field{
		position: absolute;
		left:400px;
	}
	.form{
		padding-left: 100px;
	}
	.nowyOpis{
		height: 100px;
		width: 250px;
		position: absolute;
		left:400px;
	}
	.nowyOpis:focus{
		outline: 2px solid black;
	}
`;

export default AddMovieModal