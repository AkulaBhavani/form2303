import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let navigate = useNavigate();

    useEffect(()=>{
        emailInputRef.current.value = localStorage.getItem("email");

        passwordInputRef.current.value = localStorage.getItem("password");
         validateToken();


    },[]);
      
    let validateToken = async ()=>{
        let dataToSend = new FormData();
    dataToSend.append("token",localStorage.getItem("token"));

    let reqOptions = {
        method:"POST",
        body:dataToSend,
    };
    
    let JSONData = await fetch("/validateToken",reqOptions);
        
    let JSOData = await JSONData.json();

    console.log(JSOData);
    if(JSOData.isLoggedIn == true){
        navigate("/home", {state:JSOData.details});
     }else{
        alert(JSOData.msg);
     }
    }
    let validateLogin = async ()=>{

    let dataToSend = new FormData();
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);


    let reqOptions = {
        method:"POST",
        body:dataToSend,
    };

if(emailInputRef.current.value.length >0 && passwordInputRef.current.value.length > 0)
{
    let JSONData = await fetch("/validateLogin",reqOptions)
 
    let JSOData = await JSONData.json();
    console.log(JSOData);
   
    if(JSOData.isLoggedIn == true){
       localStorage.setItem("email",emailInputRef.current.value);
       localStorage.setItem("password",passwordInputRef.current.value);
       localStorage.setItem("token",JSOData.details.token);
       navigate("/home", {state:JSOData.details});
    }else{
       alert(JSOData.msg);
    }
    //alert(JSOData.isLoggedIn);
    };
}
  
  return (
    <div className="App">
        <form>
            <div>
                <lable>Email</lable>
                <input ref={emailInputRef}></input>
            </div>
            <div>
                <lable>Paasword</lable>
                <input ref={passwordInputRef}></input>
            </div>
            <div>
                <button type='button' onClick={()=>{
                     validateLogin();
                }}>Login</button>
            </div>
           
        </form>
        <br></br>
        <br></br>
        <Link to="/signup">Sign Up</Link>
        </div>
  )

}

export default Login;