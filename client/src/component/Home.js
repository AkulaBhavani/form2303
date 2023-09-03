import React from 'react'
import { useLocation } from 'react-router-dom';
import TopNavigation from './TopNavigation';

function Home() {

    let loc = useLocation();
    console.log("Inside Home");
    console.log(loc);


    let deleteAccount = async()=>{

    let reqOptions = {
      method:"DELETE"
    }
    
    let url = `/deleteAccount?id=${loc.state.id}`
    
      
      let JSONData = await fetch(url,reqOptions);

      let JSOData = await JSONData.json();
      alert(JSOData.msg);
    }
  return (
    <div>
      <TopNavigation userDetails ={loc} /> 
      <div>
        <button type='button' onClick={()=>{
          deleteAccount();
        }}>Delete Account</button>
      </div>
        <h1>Welcome, {loc.state.firstName} {loc.state.lastName} </h1>
        <img src={`/${loc.state.profilePic}`}></img>
    </div>
  )
}

export default Home