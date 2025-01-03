import React from 'react'
import styled from "styled-components";
const SingleContent = ({id,
  nazwa,odcinki,kategoria,liczba,produkcjaid,ocena,zdjecie}) => {
  return (
  
    <Wrapper className='media'>
    
    <center><b className='title'>{nazwa}<b className='ocena'>{ocena ? <label>: <span className='gwiazdka'> ★ </span>{ocena}</label> : ocena }</b></b></center>
    <b className='emmy'>{odcinki}</b>
    <b className='kategoria'>{kategoria}</b>
    <b className='liczba'>{liczba}</b>
    <b className='produkcjaid'>{produkcjaid}</b>
    <img className='zdjecie' src={zdjecie} />
    
    
    
    </Wrapper>

  )
}

export default SingleContent

const Wrapper = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');
font-family:'Roboto';
.media {
  display: flex;
  flex-direction: row;
  width: 200px;
  padding: 5px;
  margin: 5px 0;
  background-color: #282c34;
  border-radius: 10px;
  position: relative;
}

.media:hover {
  background-color: white;
  color: black;
}

@media (max-width: 510px) {
  .media {
    width: 46%;
  }
}

.poster {
  border-radius: 10px;
}

.title {
  text-align: center;
  font-size: 25px;
  padding: 8px 0;
}
.zdjecie{
  display: block;  
  height: 265px; //  480px 640px
  width: 	430px; 
  margin-left: auto;  
  margin-right: auto;
  box-shadow:2px 2px 5px black;
}

.subTitle {
  display: flex;
  justify-content: space-between;
  padding-bottom: 3px;
  padding: 0 2px;
  padding-bottom: 3px;
}
.ocenaZdjecie{
position: relative;
}
.gwiazdka{
  color:goldenrod;
}
`;