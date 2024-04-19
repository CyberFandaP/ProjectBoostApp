import React from 'react'
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"

// Implementuje přecházení na různé stránky
const Navbar = () => {
  // Import odhlášení z hooku
  const { logout } = useLogout()

  // Funkce pro kliknutí na tlačítko a odhlášení z aplikace
  const handleClick = () => {
    // Funkce updatuje global state a odstraní JWT z local storage
    logout()
  }

  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>Workout Buddy</h1>
            </Link>
            <nav>
              <div>
                <button onClick={handleClick}>Log out</button>
              </div>
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