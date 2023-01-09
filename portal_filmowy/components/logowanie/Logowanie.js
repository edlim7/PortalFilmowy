import React, { useContext, useState,useRef } from "react";
import styled from "styled-components";
import { ModalContext } from "../../contexts/ModalContext";
import { AppContext } from "../../contexts/AppContext";
import RejestracjaModal from "../RejestracjaModal";
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);                    
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));                 
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
const Logowanie = () => {
	const { showModalLogin, setShowModalLogin,setShowRejestracjaModal} = useContext(ModalContext);
	const {Uzytkownicy,ZalogowanyUzytkownik, setZalogowanyUzytkownik} = useContext(AppContext);
	const [isLogin, setIsLogin] = useState(true);
	var zal=false;
	const passRef = useRef(null);
	const loginRef = useRef(null);
	const emailRef = useRef(null);
	function zalogujUzytkownika() {
			var hash=sha256(passRef.current.value)
			hash.then((haslo)=>{
			Uzytkownicy.forEach((el)=>{
					if(haslo===el.haslo && emailRef.current.value===el.email)
					{
					zal=true;
					localStorage.setItem('uzytkownik',JSON.stringify(el));
					console.log("Udało sie zalogować!");
					window.location.reload(true);
					}
				})
				if(zal===false)
			alert("Zły login lub hasło!");
			})
			
	}
	return (
		<>
		<RejestracjaModal/>
			{showModalLogin ? (
				<Background onClick={() => setShowModalLogin((prevState) => !prevState)}>
					<Wrapper onClick={(e) => e.stopPropagation()}>
						
						<section className="auth">
							<h1>Logowanie</h1>
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
										> Zaloguj
										</button>

									<button
										type="button"
										className="toggle"
										onClick={() => {setShowRejestracjaModal((prevState) => !prevState);
											setShowModalLogin((prevState) => !prevState);
										}}>
								   Stwórz konto
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
		border: 2px solid black;
		width: 100%;
		text-align: left;
		padding: 0.25rem;
	}
	.control input:focus {
		outline: 1px solid black;
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
