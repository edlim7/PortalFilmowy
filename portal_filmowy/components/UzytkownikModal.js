import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";
import { AppContext } from "../contexts/AppContext";
import { Formik, Form, Field } from 'formik';

const UzytkownikModal = () => {
	const {showModalUser, setShowModalUser,user, setUser} = useContext(ModalContext)
	const {Uzytkownicy} = useContext(AppContext)
	async function zmienTyp(url, data) {
		const res = await fetch(url, {
			method:'PUT',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({typKonta: data.typKont})
		});
		return res.json()
	}
	const [ZalogowanyUzytkownik, setZalogowanyUzytkownik]= useState([]);
	useEffect(() => {
		const ZalogowanyUzytkownik = JSON.parse(localStorage.getItem('uzytkownik'));
		if (ZalogowanyUzytkownik) {		
		}
	  }, []);
	  const uzytkownikid=user.uzytkownikId;
	  const uzytkownikLog=user.login;
  return (
    <>
{showModalUser ? (
				<Background onClick={() => setShowModalUser((prevState) => !prevState)}>
					<Wrapper onClick={(e) => e.stopPropagation()}>
						<Content>
							<h1>Zmień typ konta: {uzytkownikLog}</h1><br />
							<Formik initialValues={{typKont: 3}} onSubmit={(values) =>{ zmienTyp('https://localhost:5001/api/UzytkownikKontroler/updateUzytkownikById2/'+uzytkownikid, 
							values)
							.then((data)=> console.log(data))
							.catch((error)=>console.log(error))
							setShowModalUser((prevState) => !prevState)
							window.location.reload(true);} 
							}>
								<Form>
								<center>
								<label className="selec">
								<label className="labelSpacing">Administrator:<Field type="radio" name="typKont" value="1"></Field> </label> 
								<label className="labelSpacing2">Personel:<Field type="radio" name="typKont" value="2"></Field> </label> 
								<label className="labelSpacing3">Uzytkownik:<Field type="radio" name="typKont" value="3"></Field> </label> 
								</label>
								</center><br /><br />
								<center><button type='submit' className="edytuj">Edytuj!</button></center>
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
`;

const Wrapper = styled.div`
	width: 700px;
	height: 225px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
	background: white;
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
	.edytuj {
		padding: 0;
		width: 120px;
		height: 35px;
		
	}
	.edytuj:hover{
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
	.stare{
		float:left;
		padding-left: 100px;
	}
	.nowe{
		float:right;
		padding-right: 100px;
	}
	.field{
		float:right;
		padding-right: 60px;
	}
	.stareWartosci{
		float:left;
		padding-left: 50px;
		
	}
	.selec{
		font-size:20px;
		word-spacing: 10px;
	}
	b{
		font-size:30px;
	}
	.labelSpacing
	{
		word-spacing: 40px;
	}
	.labelSpacing2
	{
		word-spacing: 40px;
	}
	.labelSpacing3
	{
		word-spacing: 40px;
	}
`;

export default UzytkownikModal