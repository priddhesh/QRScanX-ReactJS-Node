import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    const auth = localStorage.getItem("user");
    if(auth){
      navigate("/");
    }
},[]);

  const handleLogin = async ()=>{
    let result = await fetch('http://localhost:5000/login',{
        method: "post",
        body : JSON.stringify({email,password}),
        headers : {
            'Content-Type': 'application/json'
           },
    })
    result = await result.json();
    if(result.name){
       localStorage.setItem("user", JSON.stringify(result));
       navigate("/scanner");
    }else{
        alert("please enter correct details");
    }
  }

  return (
    <div className='login'>
        <h1>Login</h1>
        <input onChange={(e)=>setEmail(e.target.value)} className='inputBox' type="email" placeholder='Enter email' value={email}/>
        <input onChange={(e)=>setPassword(e.target.value)} className='inputBox' type="password" placeholder='Enter password' value={password}/>
        <button type='button' onClick={handleLogin} className='appButton'>Login</button>
    </div>
  )
}

export default Login;