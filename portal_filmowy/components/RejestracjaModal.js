import React, { useContext, useState,useRef } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from 'formik';
import { ModalContext } from "../contexts/ModalContext";
import { AppContext } from "../contexts/AppContext";
const RejestracjaModal = () => {
	const { showRejestracjaModal, setShowRejestracjaModal,rejestracja, setRejestracja} = useContext(ModalContext);
	const {Uzytkownicy} = useContext(AppContext);
	const passRef = useRef(null);
	const loginRef = useRef(null);
	const emailRef = useRef(null);
	var czyWystepujeLogin=0;
	var czyWystepujeMail=0;
	async function postUzytkownik(url, data) {
		const res = await fetch(url, {
			method:'POST',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({login:data.log, haslo: data.hasl, typKonta: data.typKont,email:data.emai})
		});
		return res.json()
	}
	return (
		<>
			{showRejestracjaModal ? (
				<Background onClick={() => setShowRejestracjaModal((prevState) => !prevState)}>
					<Wrapper onClick={(e) => e.stopPropagation()}>
					<section className="auth">
					<h1>Rejestracja</h1>
					<Formik enableReinitialize initialValues={{log:"", hasl:"",typKont:3,emai:""}} onSubmit={(values) => {
							czyWystepujeLogin=0;
							czyWystepujeMail=0;
							Uzytkownicy.forEach((el)=>{
							if(el.login===values.log)
							{
								czyWystepujeLogin=czyWystepujeLogin+1;
								alert("Ten login jest zajęty!")
								
							}
							else if(el.email==values.emai)
							{
								czyWystepujeMail=czyWystepujeMail+1
								alert("Ten email jest zajęty!")
							}
							});
							if(czyWystepujeLogin==0 && czyWystepujeMail==0)
							{
								postUzytkownik('https://localhost:5001/api/UzytkownikKontroler/addUzytkownik2', 
								values)
								.then((data)=> console.log(data))
								.catch((error)=>console.log(error))
							}
							 }}>
									<Form>
									<div className="control">
									<label htmlFor="email">Twój email</label>
									<Field type ='email' id="email" name='emai' required></Field>
									</div>
									<div className="control">
									<label htmlFor="login">Twój login</label>
									<Field type ='login' name='log' id="login" required ></Field>
									</div>
									<div className="control">
									<label htmlFor="password">Twoje hasło</label>
									<Field type ='password' name='hasl' id="password" required ></Field>
									</div>
									<div className="control">
									<center><button type='submit' className="toggle">Zarejestruj!</button></center>
									</div>									
									
								</Form>
							</Formik>
						</section>
					</Wrapper>
				</Background>
			) : null}
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
	width: 500px;
	height: 500px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
	background: #fff;
	color: #000;
	display: flex;
	position: relative;
	z-index: 99;
	border-radius: 10px;

	button {
		padding: 10px 24px;
		background: #141414;
		color: #ffff;
		border: none;
	}
	.auth {
		margin: 3rem auto;
		width: 95%;
		max-width: 25rem;
		border-radius: 6px;
		padding: 1rem;
		text-align: center;
	}

	.auth h1 {
		text-align: center;
		color: Black;
	}

	.control {
		margin-bottom: 0.5rem;
	}

	.control label {
		display: block;
		color: black;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.control input {
		font: inherit;
		background-color: #f1e1fc;
		color: #38015c;
		border-radius: 4px;
		border: 1px solid white;
		width: 100%;
		text-align: left;
		padding: 0.25rem;
	}

	.actions {
		margin-top: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.actions button {
		cursor: pointer;
		font: inherit;
		color: white;
		background-color: #9f5ccc;
		border: 1px solid #9f5ccc;
		border-radius: 4px;
		padding: 0.5rem 2.5rem;
	}

	.actions button:hover {
		background-color: #873abb;
		border-color: #873abb;
	}

	.actions .toggle {
		margin-top: 1rem;
		background-color: transparent;
		color: #9f5ccc;
		border: none;
		padding: 0.15rem 1.5rem;
	}

	.actions .toggle:hover {
		background-color: transparent;
		color: #ae82cc;
	}
	input:focus{
		outline: 3px solid black;
	}
`;

export default RejestracjaModal;
