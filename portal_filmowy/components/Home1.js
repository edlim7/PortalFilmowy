import React, {useContext} from 'react'
import { AppContext } from "../contexts/AppContext";
const Home1 = () => {
 const {Age} = useContext(AppContext);
  return (
    <div>{Age} </div>
  )
}

export default Home1