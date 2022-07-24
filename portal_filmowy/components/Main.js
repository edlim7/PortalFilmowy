import React, {useState, useEffect, useContext} from "react"
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AppContext } from "../contexts/AppContext";

const Main = () => {
  const TITLE = 'Filizone - strefa dobrego kina'
  const {Age, setAge} = useContext(AppContext);
  
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
           <Field type="value" name="value" />
           <ErrorMessage name="email" component="div" />           
           <br/>

           <div class="nawigacja">                                      {/* nawigowanie, wyszukiwarka*/}
            <center>          
              <button class="listaFilmow" >       {/* onClick={} */}
                Filmy
              </button>
              <button class="listaSerialow">       {/* onClick={} */}
                Seriale
              </button>
              <button class="rankingFilmow">       {/* onClick={} */}
                Ranking filmów
              </button>
              <button class="rankingSerialow" >    {/* onClick={} */}
                Ranking seriali
              </button>
              <container class="wyszukiwarka">                          {/* container za diva?*/}
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
                <button class="wyszukaj" type="submit">          
                  Wyszukaj
                </button>
              </container>  
            </center> 
            
              
                    
           </div>

           <div class="bodyy">
            tutaj jakies polecane i jakies stale reklamki moze


           </div>

           <div class="stopka">
            <p>Copyrifht, kontakt, sociale itp</p>
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