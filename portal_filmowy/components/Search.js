import styled from "styled-components";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Search = () => (
	<Container>
		<center>
			<h1>Wyszukaj interesującą Ciebie produkcję!</h1>
			<Formik
				initialValues={{ search: "" }}
				validate={(values) => {
					const errors = {};
					if (!values.email) {
						errors.email = "Required";
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
					) {
						errors.email = "Invalid email address";
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 400);
				}}
			>
				{({}) => (
					<Form>
						<Field type="search" name="search" />
						<button type="submit">Wyszukaj</button>
					</Form>
				)}
			</Formik>
		</center>
	</Container>
);

export default Search;

const Container = styled.div`
	
	background-color: #A69595;
	button{
	border: 1px solid grey; 
	cursor: pointer;
	background: #141414;
	color: #ffff;
	border: none;
	padding: 9px 24px;
	margin-right: 1px;
   	border-radius: 5px;
	}
	button:hover{
		transition-duration: 1s;
   		background-color: darkgrey;
	}
	input{
		font: inherit;
		background-color: #f1e1fc;
		color: #38015c;
		border-radius: 4px;
		border: 1px solid #DED7DE;
		text-align: left;
		padding: 0.25rem;	
	
	}
`;
