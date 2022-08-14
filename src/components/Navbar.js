import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";


function Navbar() {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  let location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link  ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link  ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?
      <form className="d-flex" role="search">
      <Link to="/login" className="btn btn-outline-light mx-1" role="button">Login</Link>
      <Link to="/signup" className="btn btn-outline-light mx-1"  role="button">Signup</Link>
      </form>: <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar