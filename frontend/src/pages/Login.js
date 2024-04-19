import React, { useState } from "react";
// Import the useLogin hook from your hooks directory
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    // State variables for holding form input values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Destructuring functions and state from the useLogin hook
    const { login, error, isLoading } = useLogin();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the login function provided by the useLogin hook
        await login(email, password);
    };

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email:</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />

            <label>Password:</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />  

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging In...' : 'Log In'}
            </button>

            {/* Display any error messages */}
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default Login;