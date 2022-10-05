import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";
import { AppContext } from "../contexts/AppContext";
import { Formik, Form, Field } from 'formik';
import MovieModal from "./MovieModal";
const UpdateMovieModal = () => {
  const {showUpdateModalMovie, setShowUpdateModalMovie, updateMovie} = useContext(ModalContext);
	const [eduBool, setEduBool] = useState('');
	const {Kategoria} = useContext(AppContext);
	async function putFilm(url, data) {
		const res = await fetch(url, {
			method:'PUT',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({nazwa:data.nazw, opis: data.opi, zdjecie: data.zdjeci, kategoriaId: data.kategori, edukacyjny: data.edukacyjn, oskary: data.oskar})
		});
		return res.json()
	}
	var str2bool = (value) => {
		if (value && typeof value === "string") {
			 if (value.toLowerCase() === "true") return true;
			 if (value.toLowerCase() === "false") return false;
		}
		return value;
	 }
	 var str2int = (value) => {
		return parseInt(value,10);
	 }
	 const filmid=updateMovie.filmId;
	 const textArea = (props) => (
		<textArea  {...props}>
		</textArea>
	  );
  return (
    <>
{showUpdateModalMovie ? (
				<Background onClick={() => setShowUpdateModalMovie((prevState) => !prevState)}>
					<Wrapper onClick={(e) => e.stopPropagation()}>
						<Content>
							<h1>Edytuj film</h1>
							<Formik initialValues={{nazw: "", opi: "", zdjeci: "", kategori: 1, edukacyjn: false, oskar: 0}} onSubmit={(values) => putFilm('https://localhost:5001/api/FilmKontroler/updateFilmById2/'+filmid, 
							values)
							.then((data)=> console.log(data))
							.catch((error)=>console.log(error)) }>
								{({ values }) => (
								<Form>
									<center><button type='submit' className="edytujButton">Edytuj!</button></center>
									<div className="lewo">
									<h3 className="stare">Stare wartości</h3><br/>
									<label className="nazwaFilmu">Nazwa: {updateMovie.nazwa}</label><br/><br/><br/>
									<label className="stareWartosci">Zdjęcie: {updateMovie.zdjecie}</label><br/><br/><br/>
									<label className="stareWartosci">Kategoria: {updateMovie.kategoria}</label><br/><br/><br/>
									<label className="stareWartosci">Edukacyjny:{updateMovie.edukacyjny==true?" tak":" nie"}</label><br/><br/><br/>
									<label className="stareWartosci">Ilość oskarów: {updateMovie.oskary}</label><br/><br/><br/>
									<label className="opiss">Opis: {updateMovie.opis}</label><br/><br/><br/>
									</div>
									<div className="prawo">
									<h3 className="nowe">Nowe wartości</h3><br />
									<label className="field"><Field type ='nazwa' name='nazw' ></Field></label><br /><br /><br />
									<label className="field"><Field type ='zdjecie' name='zdjeci' placeholder="obrazki/"></Field></label><br /><br /><br />
									<label className="field"><Field as="select" name="kategori">
			 						{Kategoria.map((post) => (
									<option value={post.kategoriaId}>{post.nazwaKategorii}</option>
									))}
           							</Field></label><br /><br /><br/>
									<label className="field"><Field type ='checkbox' name='edukacyjn'></Field></label><br /><br /> <br/>
									<label className="field"><Field type ='number' name='oskar' min='0' max='100' ></Field></label><br /><br /><br />
									<label className="field"><Field as={textArea} name='opi' className="nowyOpis"></Field></label><br /><br /><br />
									</div>													
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
	overflow-y: scroll;
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
	input:focus{
		outline: 3px solid black;
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
	.field{
		float:right;
		padding-right: 60px;
	}
	input:focus{
		outline: 3px solid black;
	}
	.lewo{
		float: left;
		width:270px;
		padding-left: 50px;
	}
	.prawo{
		float:right;
		width:270px;
	}
	.opiss{
		width:270px;
	}
	.nazwaFilmu{
		width:270px;
		word-wrap: break-word;
	}
	.nowe{
		text-align: center;
		padding-left: 30px;
	}
	.edytujButton{
		position:absolute;
		left:286px;
	}
	.nowyOpis{
		height: 100px;
		width: 250px;
	}
	.nowyOpis:focus{
		outline: 3px solid black;
	}

`;

export default UpdateMovieModal