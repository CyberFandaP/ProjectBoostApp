import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
    // Stavové proměnné pro uchování hodnot z formuláře
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Získání kontextu autentizace pro použití dispečera
    const { dispatch } = useAuthContext();

    // Funkce pro odeslání formuláře
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Zde bys volal API pro přihlášení uživatele
        console.log(email, password);

        // Příklad jak použít dispečer pro aktualizaci stavu autentizace
        // dispatch({ type: "LOGIN", payload: { email } });
    };

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email:</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />  

            <button>Log In</button>
        </form>
    );
};

export default Login;