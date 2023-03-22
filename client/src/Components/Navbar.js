import React from 'react'
import {Link, useNavigate} from "react-router-dom";
export default function Navbar() {

    const navigate=useNavigate();
    const logout=()=>{
        localStorage.removeItem('token'); 
        navigate('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-success">
                <div className="container-fluid">
                    <Link className='navbar-brand' to={"/"}>CSL</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className='nav-link active' to={"/"}>Home</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            {localStorage.getItem('token')?
                            <button className="btn btn-primary me-2" onClick={logout}>Logout</button>
                            :
                            <>
                            <Link className="btn btn-primary me-2" to={'/signup'}>SignUp</Link>
                            <Link className="btn btn-primary " to={'/login'}>Login</Link>
                            </>  
                        }

                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
