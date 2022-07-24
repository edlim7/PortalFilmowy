import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AppContext } from "../contexts/AppContext";

const Main = () => {
	const { Age, setAge } = useContext(AppContext);

	function handleClick(e) {
		e.preventDefault();
		window.location.href = "http://google.com";
		{
			/* tutaj te przejscia na podstrony???? */
		}
	}
	function Example() {
		{
			/* title jakies zbugowane */
		}
		useEffect(() => {
			document.title = "Filizone - strefa dobrego kina";
		});
	}

	return (
		<div name="wszystko">
			{" "}
			{/* nie wiem czy nie lepiej to biale tlo */}
			<Formik
				initialValues={{ value: "do kicka to", poleWyszukiwarki: "" }}
				onSubmit={(values) => {
					setAge((prevAge) => prevAge + parseInt(values.value, 10));
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<div name="naglowek">
							<center>
								<h1 name="nazwaStrony">Filizone</h1>
							</center>
							<button name="zaloguj">
								{" "}
								{/* onClick={}, pojawia sie "plansza" cos i tam wpisujesz login i haslo */}
								Logowanie
							</button>
							<button name="zarejestruj">
								{" "}
								{/* onClick={} */}
								Rejestracja
							</button>
						</div>
						<Field type="value" name="value" /> {/* do usunięcia*/}
						<ErrorMessage name="email" component="div" />
						<br />
						<div name="nawigacja">
							{" "}
							{/* nawigowanie, wyszukiwarka*/}
							<center>
								<button name="listaFilmow" onClick={handleClick}>
									{" "}
									{/* onClick={}  to ma przenosic na podstr*/}
									Filmy,
								</button>
								<button name="listaSerialow">
									{" "}
									{/* onClick={} */}
									Seriale
								</button>
								<button name="rankingFilmow">
									{" "}
									{/* onClick={} */}
									Ranking filmów
								</button>
								<button name="rankingSerialow">
									{" "}
									{/* onClick={} */}
									Ranking seriali
								</button>
								<container name="wyszukiwarka">
									{" "}
									{/* container za diva? */}
									<input type="text" name="poleWyszukiwarki" />{" "}
									{/* wpisujesz nazwe filmu do wyszukania */}
									<ErrorMessage name="poleWyszukiwarki" component="div" />
									<button name="wyszukaj" type="submit">
										{" "}
										{/* submit do wyszukiwania??? */}
										Wyszukaj
									</button>
								</container>
							</center>
						</div>
						<div name="bodyy">
							tutaj jakies mechanizm polecania x2
							<button name="panelAdmina">
								{" "}
								{/* onClick={} */}
								Panel Admina
							</button>
						</div>
						<div name="stopka">
							<p>
								<span name="stopkaLewo">Autor: Patryk Milde</span>
								<span name="stopkaSrodek">Numer telefonu: 48+******006</span>
								<span name="stopkaPrawo">Email: patryk***@student.pl</span>
							</p>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

const Container = styled.div`
	background-color: gray;
	margin: auto;
	padding: auto;
`;
export default Main;
