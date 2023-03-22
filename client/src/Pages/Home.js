import React from 'react'
import Navbar from '../Components/Navbar'

export default function Home() {
  return (
    <div>
        <Navbar/>
        <div className='d-flex justify-content-center w-100'>
            {
                localStorage.getItem("token")?
            <h1 className='mt-3 text-dark fs-3'>
            Thanks for logging in.
            </h1>:
            <h1 className='mt-3 text-dark fs-3'>
            This is the Home Page and your are not logged in. Create account if new user and Click Sign Up. Else Login
            </h1>
            }
        </div>
    </div>
  )
}
