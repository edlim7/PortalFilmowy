import React, { useContext, useState,useRef } from "react";
import styled from "styled-components";
import { ModalContext } from "../../contexts/ModalContext";
import { AppContext } from "../../contexts/AppContext";
const Logowanie = () => {
	const { showModalLogin, setShowModalLogin} = useContext(ModalContext);
	const {Uzytkownicy,ZalogowanyUzytkownik, setZalogowanyUzytkownik,zalogowany, setZalogowany} = useContext(AppContext);
	const [isLogin, setIsLogin] = useState(true);
	console.log(Uzytkownicy);
	var zal=false;
	const passRef = useRef(null);
	const loginRef = useRef(null);
	const emailRef = useRef(null);
	function switchAuthModeHandler() {
		setIsLogin((prevState) => !prevState);
	}
	function zalogujUzytkownika() {
		
			Uzytkownicy.forEach((el)=>{
				if(passRef.current.value===el.haslo && emailRef.current.value===el.email)
				{
					setZalogowanyUzytkownik({
						id: el.uzytkownikId, 
						log: el.login, 
						hasl: el.haslo, 
						emai: el.email, 
						typKont: el.typKonta,
					});
					console.log("Udało sie zalogować!");
					zal=true;
					setZalogowany({zal:true});
				}
			})
			if(zal===false)
			console.log("Błędny login lub hasło!");
	}
	function wylogujUzytkownika() {
		setZalogowanyUzytkownik({
				id: "", 
				log: "", 
				hasl: "", 
				emai: "", 
				typKont: 0
			});
			setZalogowany({zal:false});
	}
	return (
		<>
			{showModalLogin ? (
				<Background onClick={() => setShowModalLogin((prevState) => !prevState)}>
					<Wrapper onClick={(e) => e.stopPropagation()}>
						
						<section className="auth">
							<h1>{isLogin ? "Logowanie" : "Rejestracja"}</h1>
							<form>
								<div className="control">
									<label htmlFor="email">Twój email</label>
									<input type="email" ref={emailRef} id="email" required />
								</div>
								{isLogin ? '': 
								<div className="control">
									<label htmlFor="login">Twoje login</label>
									<input type="login" ref={loginRef} id="login" required />
								</div>}
								<div className="control">
									<label htmlFor="password">Twoje hasło</label>
									<input type="password" ref={passRef} id="password" required />
								</div>
								<div className="control">

									<button type="button"
										className="toggle"
										onClick={zalogujUzytkownika}
										>{isLogin ? "Zaloguj" : "Zarejestruj"}
										</button>

									<button
										type="button"
										className="toggle"
										onClick={switchAuthModeHandler}
									>
										{isLogin ? "Stwórz konto" : "Zaloguj się"}
									</button>
								</div>
							</form>
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
`;

export default Logowanie;
