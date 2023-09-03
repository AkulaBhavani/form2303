import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function SignUp() {



let [profilePic,setProfilePic] = useState("./images/profilePic.jpg")

  let fnInputRef = useRef();
  let lnInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let MobileNoInputRef = useRef();
  let profilePicInputRef = useRef();

  let sendSignupDataToServer = async()=>{

    let dataToSend = {
      fn:fnInputRef.current.value,
      ln:lnInputRef.current.value,
      age:ageInputRef.current.value,
      email:emailInputRef.current.value,
      password:passwordInputRef.current.value,
     mobileNo:MobileNoInputRef.current.value,
     profilePic:profilePicInputRef.current.value
    }

    let myHeaders = new Headers();
    myHeaders.append("content-type","application/json")

    let reqOptions = {
      method:"POST",
      body:JSON.stringify(dataToSend),
      headers:myHeaders
    }


   let JSONData = await fetch("/signup",reqOptions);
   let JSOData = await JSONData.json()
   console.log(JSOData); 
  }

  let sendSignupDataToServerUsingURLE = async()=>{
     
    let dataToSend = new URLSearchParams();
    dataToSend.append("fn",fnInputRef.current.value)
    dataToSend.append("ln",lnInputRef.current.value)
    dataToSend.append("age",ageInputRef.current.value)
    dataToSend.append("email",emailInputRef.current.value)
    dataToSend.append("password",passwordInputRef.current.value)
    dataToSend.append("mobileNo",MobileNoInputRef.current.value)
    dataToSend.append("profilePic",profilePicInputRef.current.value)


    let myHeaders = new Headers();
    //myHeaders.append("content-type","application/json")
    myHeaders.append("content-type","application/x-www-form-urlencoded");

    let reqOptions = {
      method:"POST",
      body:dataToSend,
      headers:myHeaders
    }


   let JSONData = await fetch("/signup",reqOptions);
   let JSOData = await JSONData.json()
   console.log(JSOData); 
  }
  let sendSignupDataToServerUsingFD = async()=>{
     
    let dataToSend = new FormData();
    dataToSend.append("fn",fnInputRef.current.value);
    dataToSend.append("ln",lnInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    dataToSend.append("mobileNo",MobileNoInputRef.current.value);

   for(let i=0;i < profilePicInputRef.current.files.length;i++){
    dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
   }
   let reqOptions = {
      method:"POST",
      body:dataToSend,
    }
   let JSONData = await fetch("/signup",reqOptions);
   let JSOData = await JSONData.json();
   
   alert(JSOData.msg);

   console.log(JSOData); 
  }
  
  return (
    <div className="App">
        <form>
          <h1>Sign Up</h1>
            <div>
                <label>First Name</label>
                <input ref={fnInputRef}></input>
                </div>
                <div>
                <label>Last Name</label>
                <input ref={lnInputRef}></input>
                </div>
                <div>
                <label>Age</label>
                <input ref={ageInputRef}></input>
                </div>
                <div>
                <label>Email</label>
                <input ref={emailInputRef}></input>
                </div>
                <div>
                <label>Password</label>
                <input ref={passwordInputRef}></input>
                </div>
                <div>
                <label>MobileNo</label>
                <input ref={MobileNoInputRef}></input>
                </div>
                <div>
                <label>ProfilePic</label>
                <input type='file' ref={profilePicInputRef} onChange={()=>{
                  let selectedFileURL = URL.createObjectURL(profilePicInputRef.current.files[0]);
                  console.log(profilePicInputRef.current.files);
                  console.log(selectedFileURL);
                  setProfilePic(selectedFileURL);
                }}></input>
                <br></br>
                <img src={profilePic} className='imagePreview'></img>
                </div>
                <div>
            <button type='button' onClick={()=>{
              sendSignupDataToServer();
            }}>Sign Up(JSON)</button>
            <button type='button' onClick={()=>{
          sendSignupDataToServerUsingURLE();
        }}>Sign Up(URLEncode)</button> 
        <button type='button' onClick={()=>{
         sendSignupDataToServerUsingFD();
              
        }}>Sign Up(UForm Data)</button>        
                </div>
                
                </form>
                <br></br>
                <br></br>
                <Link to="/">Login</Link>
    </div>
  )
}

export default SignUp