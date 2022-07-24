import styled from "styled-components";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Search = () => (
	<Container>
		<center>
			<h1>Wyszukaj</h1>
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
						<button type="submit">Sprawdz</button>
					</Form>
				)}
			</Formik>
		</center>
	</Container>
);

export default Search;

const Container = styled.div`
	background-color: gray;
`;
