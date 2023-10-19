import React, {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [name, setName] = useState("");
  const[email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  useEffect(()=>{
       const auth = localStorage.getItem("user");
       if(auth){
         navigate("/scanner");
       }
  },[]);

  const collectData = async() =>{
    let result = await fetch('https://e-commerce-fhxo.onrender.com/register',{
       method: 'post',
       body : JSON.stringify({name,email,password}),
       headers :{
        'Content-Type': 'application/json'
       },
    });
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result));
    if(result){
      navigate('/');
    }
  }

  return (
    <>
    <div className='register'>
        <h1>Register</h1>
        <input className='inputBox' placeholder='Enter name' type="text" value={name} name='name' onChange={(e)=>{setName(e.target.value)}}/>

        <input className='inputBox'  placeholder='Enter email' type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />

        <input className='inputBox'  placeholder='Enter password' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button onClick={collectData} className='appButton' type='button'>Sign Up</button>
    </div>
    </>
  )
}

export default Signup