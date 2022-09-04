import React from 'react'
import styled from "styled-components";
const SingleContent = ({id,
  nazwa,odcinki,kategoria,liczba,produkcjaid,ocena}) => {
  return (
    <Wrapper className='media'>
    <b className='title'>{nazwa}</b>
    <b className='emmy'>{odcinki}</b>
    <b className='kategoria'>{kategoria}</b>
    <b className='liczba'>{liczba}</b>
    <b className='produkcjaid'>{produkcjaid}</b>
    <b className='ocena'>{ocena}</b>
    </Wrapper>

  )
}

export default SingleContent

const Wrapper = styled.div`
.media {
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 5px;
  margin: 5px 0;
  background-color: #282c34;
  border-radius: 10px;
  position: relative;
  font-family: "Montserrat", sans-serif;
}

.media:hover {
  background-color: white;
  color: black;
}

@media (max-width: 550px) {
  .media {
    width: 46%;
  }
}

.poster {
  border-radius: 10px;
}

.title {
  width: 100%;
  text-align: center;
  font-size: 17px;
  padding: 8px 0;
}

.subTitle {
  display: flex;
  justify-content: space-between;
  padding-bottom: 3px;
  padding: 0 2px;
  padding-bottom: 3px;
}`;