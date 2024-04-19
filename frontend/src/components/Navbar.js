import React from 'react';
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout(); // Logout function that updates global state and clears local storage
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Focus Booster</h1>
                </Link>
                <nav>
                    {user ? (
                        <div>
                            {/* Display the username if user is logged in */}
                            <span>{user.username}</span>  
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">Log in</Link>
                            <Link to="/signup">Sign up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;