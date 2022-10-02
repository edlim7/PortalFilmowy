import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../contexts/ModalContext";
import { AppContext } from "../contexts/AppContext";
import { Formik, Form, Field } from 'formik';
import UzytkownikModal from "../components/UzytkownikModal";
const PanelAdminaModal = () => {
	const {showPanelAdminaModal, setShowPanelAdminaModal,setUser} = useContext(ModalContext)
	const {setShowModalUser} = useContext(ModalContext);
	const {Uzytkownicy} = useContext(AppContext)
	const [ZalogowanyUzytkownik, setZalogowanyUzytkownik]= useState([]);
	useEffect(() => {
		const ZalogowanyUzytkownik = JSON.parse(localStorage.getItem('uzytkownik'));
		if (ZalogowanyUzytkownik) {
			setZalogowanyUzytkownik(ZalogowanyUzytkownik);
		}
	  }, []);
  return (
    <>
	<UzytkownikModal/>
{showPanelAdminaModal ? (
				<Background onClick={() => setShowPanelAdminaModal((prevState) => !prevState)}>
					<Wrapper onClick={(e) => e.stopPropagation()}>
						<Content>
							<h1>Zmień typ konta użytkowników</h1>
							<Formik initialValues={{id: 3, typKont: 1, log:""}}>
						{({}) => (
								<Form>
									<label><b>Nazwa konta:</b><b className="typKonta">Typ konta:</b>  </label><br /><br />
			 						{Uzytkownicy.map((post) => (
										<label className="selec">{post.login}: <span className="postTypKonta">{post.typKonta==1? "Admin": post.typKonta==2? "Personel":"Użytkownik" }</span>
										<button type='submit' onClick={() => {
										setShowModalUser((prevState) => !prevState);
										setUser(post);
										}}className="edytuj">
										Edytuj!
										</button><br/>
										</label>
									))}
           															
									
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
		position: relative;
		left: 30px;
		cursor: pointer;
		background: #141414;
		color: #ffff;
		border: none;
		padding: 0px;
		width: 60px;
		height: 25px;
		
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
		margin: 3rem auto;
		width: 95%;
		max-width: 25rem;
		border-radius: 6px;
		padding: 1rem;
		text-align: center;
	}
	b{
		text-align: center;
		color: Black;
		font-size:24px;
	}
	.typKonta{
		position: relative;
		left:50px;
	}
	.postTypKonta{
		text-align: center;
	}
`;

export default PanelAdminaModal