import React from 'react'
import { Link } from "react-router-dom"

// Implementuje přecházení na různé stránky
const Navbar = () => {
  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>Focus Booster</h1>
            </Link>
            <nav>
              <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            </nav>
        </div>
    </header>
  )
}

export default Navbar