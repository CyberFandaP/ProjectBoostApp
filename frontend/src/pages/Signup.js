// ./pages/Signup
import React, { useState } from "react";
// Import the useSignup hook
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    // State variables to store form inputs
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Retrieve the signup function, error state, and loading state from the useSignup hook
    const { signup, error, isLoading } = useSignup();

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the signup function from the useSignup hook
        await signup(email, password, username); // Ensure you pass the username if your API expects it
    };

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Email:</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />

            <label>Username:</label>
            <input 
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
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
                {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>

            {/* Display any error messages */}
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default Signup;