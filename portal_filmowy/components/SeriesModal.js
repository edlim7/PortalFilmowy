import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";
import { AppContext } from "../contexts/AppContext";
import { Formik, Form, Field } from 'formik';
import UpdateSeriesModal from "../components/UpdateSeriesModal";
const SeriesModal = () => {
  const {showModalSeries, setShowModalSeries, series} = useContext(ModalContext);
  const {setShowUpdateModalSeries,setUpdateSeries,} = useContext(ModalContext);
  const [ZalogowanyUzytkownik, setZalogowanyUzytkownik]= useState([]);
useEffect(() => {
	const ZalogowanyUzytkownik = JSON.parse(localStorage.getItem('uzytkownik'));
	if (ZalogowanyUzytkownik) {
		setZalogowanyUzytkownik(ZalogowanyUzytkownik);
	}
  }, []);
  const {Oceny} = useContext(AppContext);
  var czyOcenil=0;
	var ocenaid=0;
	async function skomentuj(url, data) {
		const res = await fetch(url, {
			method:'POST',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({tresc:data.tresc, produkcjaId: data.id, uzytkownikID: data.name})
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
	async function ocen(url, data) {
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
	async function usunKom(url) {
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
							<center><h1 className="tytulSerial">{series.nazwa}</h1></center>
							{ZalogowanyUzytkownik.typKonta==1 || ZalogowanyUzytkownik.typKonta==2 ? 
							<label>
							<button 
							onClick={() => {setShowUpdateModalSeries((prevState) => !prevState); 
							setUpdateSeries(series);
							setShowModalSeries((prevState) => !prevState)}}
							className="EdytujFilm"
							>
							Edytuj serial
							</button>
							<button 
							onClick={() => {
								setShowModalSeries((prevState) => !prevState)
								deleteSeries('https://localhost:5001/api/SerialKontroler/deleteSerialById2/'+series.serialId);
								window.location.reload(false);
							}}
							className="usunFilm"
							>
							Usuń serial
							</button></label>
							:<></>}
							<center><p className="obokTytul"><img src={series.zdjecie} />
							 Ilość sezonów: {series.sezony}<br /><br />
							 Ilość odcinków: {series.odcinki}<br /><br />
							 Ilość emmy: {series.emmy} <br /><br />
							 Kategoria: {series.kategoria} <br /><br />
							 	Ocena: {series.ocena} 
							<Formik initialValues={{id: series.produkcjaId, name: ZalogowanyUzytkownik.uzytkownikId, oce: 1}} onSubmit={(values) =>{ 
							Oceny.forEach((el)=>{
							czyOcenil=0;
							if(el.uzytkownikID===ZalogowanyUzytkownik.uzytkownikId && el.produkcjaId===series.produkcjaId)
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
								window.location.reload(false);
							}
							else if(czyOcenil>0)
							{
								zmienOcene('https://localhost:5001/api/OcenaKontroler/updateOcenaById/'+ocenaid, 
								values)
								.then((data)=> console.log(data))
								.catch((error)=>console.log(error));
								window.location.reload(false);
							}
							else{
								alert("Musisz być zalogowany, aby ocenić serial!");
							}
							 }}>
								<Form>
								<br/><Field type ='number' name='ocea' min='1' max='10'></Field>
									<button type='submit' className="oc">Oceń</button>
								</Form>
							</Formik>
							</p></center>
							<p> Opis:</p>
							<span className="opis">{series.opis}</span>
							<p>Komentarze:</p>  {series.komentarze.map((post)=> 
							<ul key={post.id} >
								<li key={post.id} >
								{post.nazwaUzytkownika=="Admin"  ? <b className="admin">{post.nazwaUzytkownika}</b>:  post.nazwaUzytkownika=="Personel" ? 
								<b className="personel">{post.nazwaUzytkownika}</b>:<b>{post.nazwaUzytkownika}</b>}
								: {ZalogowanyUzytkownik.typKonta==1 || ZalogowanyUzytkownik.typKonta==2 ? <button className="usunKom" onClick={() =>{ 
									usunKom('https://localhost:5001/api/KomentarzKontroler/deleteKomentarzById/'+post.komentarzId)
									window.location.reload(false);
									}}>X</button>: ""} <br />  {post.tresc} <hr />
								</li>
							</ul>
							)} 
							<Formik initialValues={{id: series.produkcjaId, name: ZalogowanyUzytkownik.uzytkownikId, tresc:''}} onSubmit={(values) => {
							if(ZalogowanyUzytkownik.typKonta===undefined)
							{
								alert("Musisz być zalogowany, aby skomentować serial!");
							}
							else
							{
							skomentuj('https://localhost:5001/api/KomentarzKontroler/addKomentarz', 
							values)
							.then((data)=> console.log(data))
							.catch((error)=>console.log(error));
							window.location.reload(false);} 
							}}>
		
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
	input:focus{
		outline: 3px solid black;
	}
	.tytulSerial{
		width:350px;
		word-wrap: break-word;
	}
	.oc{
		position: relative;
		bottom: 3px;
	}
`;
export default SeriesModal