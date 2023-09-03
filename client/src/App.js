
import './App.css';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Home from './component/Home';
import EditProfile from './component/EditProfile';
import {BrowserRouter,Routes,Route} from "react-router-dom";
 
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}></Route>
  <Route path="/signup" element={<SignUp></SignUp>}></Route>
  <Route path="/home" element={<Home></Home>}></Route>
  <Route path="/editProfile" element={<EditProfile></EditProfile>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
