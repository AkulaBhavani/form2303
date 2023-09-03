import React from 'react'
import { Link } from 'react-router-dom'
 import { useNavigate } from 'react-router-dom';


function TopNavigation(props) {
    let navigate = useNavigate();
  return (
    <nav>
        <Link to="/home">Home</Link>
       {/* <Link to="/editProfile">Edit Profile</Link>*/}
       <button onClick={()=>{
        navigate("/editProfile");
       }}>Home</button>
       <button onClick={()=>{
        navigate("/editProfile",{state:props.userDetails.state });
       }}>Edit Profile</button>
       <button onClick={()=>{
        localStorage.clear();
        navigate("/");
       }}>Logout</button>
    </nav>
  )
}

export default TopNavigation