import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout =()=>{
    localStorage.clear();
    navigate('/signup');
  }
  return (
    <div>
      <img src="https://yt3.ggpht.com/ytc/AKedOLR09bCpy_XTq2scU91URc0pWG0EqS_Yc_Zg-r9pBQ=s900-c-k-c0x00ffffff-no-rj" alt="logo" className='logo'/>
      { auth ?
      <ul className='nav-ul'>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/contactus">Contact Us</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
        <li><Link to="/data">Data</Link></li>
        <li><Link onClick={logout} to="/">Logout ({JSON.parse(auth).name})</Link></li>
      </ul>:
          <ul className='nav-ul nav-right'>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/">Login</Link></li>
          </ul>
        }
    </div>
  )
}

export default Nav;