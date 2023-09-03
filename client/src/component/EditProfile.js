import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import TopNavigation from './TopNavigation';
import { useLocation } from 'react-router-dom';


function EditProfile() {

let [profilePic,setProfilePic] = useState("./images/profilePic.jpg")

let loc = useLocation();
console.log(loc);

  let fnInputRef = useRef();
  let lnInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let MobileNoInputRef = useRef();
  let profilePicInputRef = useRef();

  useEffect(()=>{
  fnInputRef.current.value = loc.state.firstName;
  lnInputRef.current.value = loc.state.lastName;
  ageInputRef.current.value = loc.state.age;
  emailInputRef.current.value = loc.state.email;
   MobileNoInputRef.current.value = loc.state.mobileNo;
   setProfilePic(`/${loc.state.profilePic}`)
  //profilePicInputRe.current.value = loc.state.profilePic;
  },[]) 
  
  let sendSignupDataToServerUsingFD = async()=>{
     
    let dataToSend = new FormData();
    dataToSend.append("fn",fnInputRef.current.value);
    dataToSend.append("ln",lnInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    dataToSend.append("mobileNo",MobileNoInputRef.current.value);
    dataToSend.append("id",loc.state.id);

   for(let i=0;i < profilePicInputRef.current.files.length;i++){
    dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
   }
   let reqOptions = {
      method:"PUT",
      body:dataToSend,
    }
   let JSONData = await fetch("/editProfile",reqOptions);
   let JSOData = await JSONData.json();
   
   alert(JSOData.msg);

   console.log(JSOData); 
  }
  
  return (
    <div className="App">
      <TopNavigation/>
        <form>
          <h1>Edit Profile</h1>
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
         sendSignupDataToServerUsingFD();
              
        }}>Update Profile</button>        
                </div>
                
                </form>
                <br></br>
                <br></br>
                <Link to="/">Login</Link>
    </div>
  )
}

export default EditProfile;