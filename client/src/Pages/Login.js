import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';
export default function Login() {
    const navigate = useNavigate();
    const [state,setState]=useState({email:"",password:""})
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch("https://complete-login-signup.vercel.app/login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:state.email,password:state.password})
        })
        const json=await response.json();
        if(!json.success){
            alert(`${json.msg}`);
        }
        else{
            alert("Login SuccessFull");
            localStorage.setItem("token",json.token);
            navigate('/');
        }
    }
    const onChange=(e)=>{
        setState({...state,[e.target.name]:e.target.value});
    }
  return (
    <div>
        <Navbar />
            <div className='container mt-2'>
                <h2 className='my-4'>
                    Login
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name="email" value={state.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={onChange} name="password" value={state.password} />
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
    </div>
  )
}

