import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";
import { AppContext } from "../contexts/AppContext";
import { Formik, Form, Field } from 'formik';
import UpdateSeriesModal from "../components/UpdateSeriesModal";
const SeriesModal = () => {
  const {showModalSeries, setShowModalSeries, series} = useContext(ModalContext);
  const {setShowUpdateModalSeries,setUpdateSeries,} = useContext(ModalContext);
  const {ZalogowanyUzytkownik, setZalogowanyUzytkownik} = useContext(AppContext);
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
	async function deleteSeries(url) {
		const res = await fetch(url, {
			method:'DELETE',
		});
	}
	async function deleteKom(url) {
		const res = await fetch(url, {
			method:'DELETE',
		});
	}
	console.log("series: "+ series);
	const serialid=series.serialId;
  return (
    <>
	<UpdateSeriesModal />
{showModalSeries ? (
				<Background onClick={() => setShowModalSeries((prevState) => !prevState)}>
					<Wrapper onClick={(e) => e.stopPropagation()}>
						<Content>
							<center><h1>{series.nazwa}</h1></center>
							<button 
							onClick={() => {setShowUpdateModalSeries((prevState) => !prevState); 
							setUpdateSeries(series);
							setShowModalSeries((prevState) => !prevState)}}
							className="EdytujFilm"
							>
							Edytuj film
							</button>
							<button 
							onClick={() => {
								setShowModalSeries((prevState) => !prevState)
								deleteSeries('https://localhost:5001/api/SerialKontroler/deleteSerialById2/'+series.serialId);
							}}
							className="usunFilm"
							>
							Usuń film
							</button>
							<center><p className="obokTytul"><img src={series.zdjecie} />
							 Ilość sezonów: {series.sezony}<br /><br />
							 Ilość odcinków: {series.odcinki}<br /><br />
							 Ilość emmy: {series.emmy} <br /><br /></p>

							<p> Kategoria: {series.kategoria} <br /><br />
							 	Ocena: {series.ocena} 
							<Formik initialValues={{id: series.produkcjaId, name: ZalogowanyUzytkownik.id, oce: 1}} onSubmit={(values) => postOcena('https://localhost:5001/api/OcenaKontroler/addOcena', 
							values)
							.then((data)=> console.log(data))
							.catch((error)=>console.log(error)) }>
								<Form>
									<Field type ='number' name='ocea' min='1' max='10'>
					  				</Field>
									<button type='submit'>Oceń</button>
								</Form>
							</Formik>
							</p></center>
							<p>Komentarze:</p>  {series.komentarze.map((post)=> 
							<ul key={post.id} >
								<li key={post.id} >
								{post.nazwaUzytkownika=="Admin"  ? <b className="admin">{post.nazwaUzytkownika}</b>:  post.nazwaUzytkownika=="Personel" ? 
								<b className="personel">{post.nazwaUzytkownika}</b>:<b>{post.nazwaUzytkownika}</b>}
								: {ZalogowanyUzytkownik.typKont==1 || ZalogowanyUzytkownik.typKont==2 ? <button className="usunKom" onClick={() =>{ deleteKom('https://localhost:5001/api/KomentarzKontroler/deleteKomentarzById/'+post.komentarzId)}}>X</button>: ""} <br />  {post.tresc} <hr />
								</li>
							</ul>
							)} 
							<Formik initialValues={{id: series.produkcjaId, name: ZalogowanyUzytkownik.id, tresc:''}} onSubmit={(values) => postKom('https://localhost:5001/api/KomentarzKontroler/addKomentarz', 
							values)
							.then((data)=> console.log(data))
							.catch((error)=>console.log(error)) }>
		
								<Form>
									<Field type='tresc' name='tresc'></Field>
									<button type='submit'>Skomentuj</button>
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
	background: #DED7DE;
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
		padding: 9px 24px;	
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
		margin-top: 10px;
	}
	.EdytujFilm{
		position:absolute;
		top:10px;
		right: 10px;
		height: 45px;
		width: 145px;
	}
	.usunFilm{
		position:absolute;
		top:10px;
		left: 10px;
		height: 45px;
		width: 145px;
	}
	.usunKom{
		background-color: red;
		padding: 0px;
		width:22px;
		height: 22px;
	}
`;
export default SeriesModal