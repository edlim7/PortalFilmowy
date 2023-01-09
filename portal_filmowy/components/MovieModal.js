import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";
import { Formik, Form, Field } from 'formik';
import { AppContext } from "../contexts/AppContext";
import UpdateMovieModal from "../components/UpdateMovieModal";
const MovieModal = () => {
 	const {showModalMovie, setShowModalMovie, movie} = useContext(ModalContext);
	const {setShowUpdateModalMovie,setUpdateMovie,} = useContext(ModalContext);
	const [ZalogowanyUzytkownik, setZalogowanyUzytkownik]= useState([]);
	const {Oceny} = useContext(AppContext);
	var czyOcenil=0;
	var ocenaid=0;
	useEffect(() => {
		const ZalogowanyUzytkownik = JSON.parse(localStorage.getItem('uzytkownik'));
		if (ZalogowanyUzytkownik) {
			setZalogowanyUzytkownik(ZalogowanyUzytkownik);
		}
	  }, []);
	async function skomentuj(url, data) {
		const res = await fetch(url, {
			method:'POST',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({tresc:data.tresc, produkcjaId: data.id, uzytkownikID: data.name})
		});
		return res.json()
	}
	async function ocen(url, data) {
		const res = await fetch(url, {
			method:'POST',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({liczba: data.ocea, produkcjaId: data.id, uzytkownikID: data.name})
		});
		return res.json()
	}
	async function zmienOcene(url, data) {
		const res = await fetch(url, {
			method:'PUT',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({liczba: data.ocea})
		});
		return res.json()
	}
	async function usunFilm(url) {
		const res = await fetch(url, {
			method:'DELETE',
		});
	}
	async function usunKom(url) {
		const res = await fetch(url, {
			method:'DELETE',
		});
	}
	const filmid=movie.filmId;
  return (
    <>
	<UpdateMovieModal />
{showModalMovie ? (
				<Background onClick={() => setShowModalMovie((prevState) => !prevState)}>
					<Wrapper onClick={(e) => e.stopPropagation()}>
						<Content>
							<center><h1 className="tytulFilm">{movie.nazwa}</h1></center>
							{ZalogowanyUzytkownik.typKonta==1 || ZalogowanyUzytkownik.typKonta==2 ? 
							<label>
							<button 
							onClick={() => {setShowUpdateModalMovie((prevState) => !prevState); 
							setUpdateMovie(movie);
							setShowModalMovie((prevState) => !prevState)}}
							className="EdytujFilm"
							>
							Edytuj film
							</button>
							<button 
							onClick={() => {
								setShowModalMovie((prevState) => !prevState)
								usunFilm('https://localhost:5001/api/FilmKontroler/deleteFilmById2/'+filmid);
								window.location.reload(true);
							}}
							className="usunFilm"
							>
							Usuń film
							</button>
							</label>
							:  <></>}
							<p className="obokTytul"><img src={movie.zdjecie}/>
							 Ilość oskarów: {movie.oskary} <br /><br />
							 Kategoria: {movie.kategoria} <br /><br />
							 Ocena: {movie.ocena} <br />
							
							<Formik initialValues={{id: movie.produkcjaId, name: ZalogowanyUzytkownik.uzytkownikId, ocea: 1}} onSubmit={(values) =>{ 
							Oceny.forEach((el)=>{
								czyOcenil=0;
								if(el.uzytkownikID===ZalogowanyUzytkownik.uzytkownikId && el.produkcjaId===movie.produkcjaId)
									{
										czyOcenil=czyOcenil+1;
										ocenaid=el.ocenaId;
									}
							     });
								if(czyOcenil===0 && ZalogowanyUzytkownik.typKonta!=undefined)
								{
									ocen('https://localhost:5001/api/OcenaKontroler/addOcena', 
									values)
									.then((data)=> console.log(data))
									.catch((error)=>console.log(error));
									window.location.reload(true);
								}else if(czyOcenil>0){
									zmienOcene('https://localhost:5001/api/OcenaKontroler/updateOcenaById/'+ocenaid, 
									values)
									.then((data)=> console.log(data))
									.catch((error)=>console.log(error));
									window.location.reload(true);
								}
								else{
									alert("Musisz być zalogowany, aby ocenić film!");
								}
								 }}>
									<Form>
									<br/><Field type ='number' name='ocea' min='1' max='10' className="ocenienanie" required></Field>
									<button type='submit' className="oc">Oceń</button>
								</Form>
							</Formik>
							
							</p>
							 
							<p> Opis:</p>
							<span className="opis">{movie.opis}</span>
							
							<p>Komentarze:</p>  {movie.komentarze.map((post)=> 
							<ul key={post.id} >
								<li key={post.id} >
								{post.nazwaUzytkownika=="Admin"  ? <b className="admin">{post.nazwaUzytkownika}</b>:  post.nazwaUzytkownika=="Personel" ? 
								<b className="personel">{post.nazwaUzytkownika}</b>:<b>{post.nazwaUzytkownika}</b>}
								: {ZalogowanyUzytkownik.typKonta==1 || ZalogowanyUzytkownik.typKonta==2 ? <button className="usunKom" onClick={() =>{ 
									usunKom('https://localhost:5001/api/KomentarzKontroler/deleteKomentarzById/'+post.komentarzId)
									window.location.reload(true);
									}}>X</button>: ""}  <br/>{post.tresc} <hr />
								
								</li>
							</ul>
							)} 
							<p>Dodaj komentarz:</p>
							<Formik initialValues={{id: movie.produkcjaId, name: ZalogowanyUzytkownik.uzytkownikId, tresc:''}} onSubmit={(values) =>{ 
							if(ZalogowanyUzytkownik.typKonta===undefined)
							{
								alert("Musisz być zalogowany, aby skomentować film!");
							}
							else
							{
								skomentuj('https://localhost:5001/api/KomentarzKontroler/addKomentarz', 
								values)
								.then((data)=> console.log(data))
								.catch((error)=>console.log(error));
								window.location.reload(true);
							}
							 }}>
		
								<Form>
									<Field type='tresc' name='tresc' required></Field>
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
	background: white;//#DED7DE;
	color: #000;
	position: absolute;
	z-index: 1000;
	border-radius: 10px;
	overflow-y:scroll; 
`

const Content = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');
	font-family: 'Roboto';
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: left;
	padding-left: 5px;
	padding-bottom: 10px;
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
		height: 288px;
		width: 	320px; 
		margin-right: 1px;
   		border-radius: 5px;
		box-shadow:2px 2px 5px black;
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
		border: 2px solid black;
		text-align: left;
		padding: 0.25rem;
		margin-right:5px;	
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
	input:focus{
		outline: 1px solid black;
	}
	.usunKom{
		background-color: red;
		padding: 0px;
		width:22px;
		height: 22px;
	}
	.tytulFilm{
		width:350px;
		word-wrap: break-word;
	}
	.oc{
		position: relative;
		bottom: 3px;
	}
`;

export default MovieModal