import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Signup = () => {
    // Stavové proměnné pro uchování hodnot z formuláře
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Získání kontextu autentizace pro použití dispečera
    const { dispatch } = useAuthContext();

    // Funkce pro odeslání formuláře
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Zde můžeš provést validaci formuláře, např. ověření délky hesla, platnosti emailu, atd.

        // Zde bys volal API pro registraci uživatele
        console.log(email, username, password);

        // Příklad jak použít dispečer pro aktualizaci stavu autentizace
        // dispatch({ type: "REGISTER", payload: { email, username } });
    };

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Username:</label>
            <input 
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Password:</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />  

            <button>Sign Up</button>
        </form>
    );
};

export default Signup;