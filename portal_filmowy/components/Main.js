import React, {useState, useEffect, useContext} from "react"
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AppContext } from "../contexts/AppContext";

const Main = () => {
  const TITLE = 'Filizone - strefa dobrego kina'
  const {Age, setAge} = useContext(AppContext);
  function handleClick(e){
    e.preventDefault();
    console.log('The link was clicked.');
  }
{/* title jakies zbugowane */}

  return (

   <div class="wszystko">        {/* nie wiem czy nie lepiej to biale tlo */}
       
     <Formik
       initialValues={{ value: 0, password: '' }}
       onSubmit={
        (values)=>{ setAge(prevAge => prevAge + parseInt(values.value, 10))}
      }
     >
      
       {({ isSubmitting }) => (
         <Form>
          <div class="naglowek">
               <center><h1 class="nazwaStrony">Filizone</h1></center>
               
          </div> 
           <Field type="value" name="value" />              {/* do usunięcia*/}
           <ErrorMessage name="email" component="div" />           
           <br/>

           <div class="nawigacja">                                      {/* nawigowanie, wyszukiwarka*/}
            <center>          
              <button class="listaFilmow" onClick={handleClick}>       {/* onClick={}  to ma przenosic na podstr*/}
                Filmy,
              </button>
              <button class="listaSerialow" >       {/* onClick={} */}
                Seriale
              </button>
              <button class="rankingFilmow" >       {/* onClick={} */}
                Ranking filmów
              </button>
              <button class="rankingSerialow" >    {/* onClick={} */}
                Ranking seriali
              </button>
              <container class="wyszukiwarka">                          {/* container za diva? */}
                <Field name="poleWyszukiwarki" />                        {/* wpisujesz nazwe filmu do wyszukania */}
                <ErrorMessage name="poleWyszukiwarki" component="div" />  
                <button class="wyszukaj" type="submit">                   {/* submit do wyszukiwania??? */}
                  Wyszukaj
                </button>
              </container>  
            </center> 
            
              
                    
           </div>

           <div class="bodyy">
            tutaj jakies polecane i jakies stale reklamki moze


           </div>

           <div class="stopka">
            <p><center><span class="stopkaLewo">Autor: Patryk Milde</span>
            <span class="stopkaSrodek">Numer telefonu: 48+******006</span>
            <span class="stopkaPrawo">Email: patryk***@student.pl</span></center>         
            </p>
           </div>
           
         </Form>
       )}
     </Formik>
   </div>
  )
}

const Container = styled.div`
background-color:gray;
margin: auto;
padding: auto;
`
export default Main