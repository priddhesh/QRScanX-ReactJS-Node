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
      <img src="https://th.bing.com/th/id/R.c9f76fd0297759053b4d4f435711e304?rik=BknEwgWf6tXZkg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-7kb6xnLNNa8%2fUp0Cww5hjlI%2fAAAAAAAABLg%2fJKwBoHkJd5E%2fs1600%2fqrmzl.fshpvssb.png&ehk=vn9JhXk1zHhM%2bbyohcHWAaGXgYnVipaVsxnyZVnVk3s%3d&risl=&pid=ImgRaw&r=0" alt="logo" className='logo'/>
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