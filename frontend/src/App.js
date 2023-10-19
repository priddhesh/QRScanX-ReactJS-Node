import './App.css';
import Login from './Components/Login';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Scanner from './Components/Scanner';
import Signup from './Components/Signup';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router";
import QRcodes from './Components/QRcodes';

function App() {
  return (
    <>
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/scanner" element={<Scanner/>}></Route>
      <Route path="/data" element={<QRcodes/>}></Route>
    </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

export default App;
