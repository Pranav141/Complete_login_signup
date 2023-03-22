import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';
export default function SignUp() {
    const navigate=useNavigate();
    const [state,setState]=useState({name:"",email:"",password:"",confirmpassword:""})
    const handleSubmit=async (e)=>{
        if(state.confirmpassword!==state.password){
            alert("Please confirm Your Password");
            return;
        }
        e.preventDefault();
        const response=await fetch("https://complete-login-signup.vercel.app/signup",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:state.name,email:state.email,password:state.password})
        })
        const json=await response.json();
        if(!json.success){
            alert(`${json.errors[0].msg}`);
        }
        else{
            alert("User created");
            alert("Please check your email for a link");
            navigate('/login');
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
                    Sign Up
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' onChange={onChange} value={state.name} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name="email" value={state.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text text-dark">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={onChange} name="password" value={state.password} />
                        <div className=''>

                        <PasswordStrengthBar password={state.password} className="mt-2 text-dark" minLength={8}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={onChange} name="confirmpassword" value={state.confirmpassword} />
                        <div className=''>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </div>
    )
}
