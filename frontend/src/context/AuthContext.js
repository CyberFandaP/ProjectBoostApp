import React, { createContext, useReducer, useEffect } from "react";

// Vytvoření kontextu
export const AuthContext = createContext();

// Reducer pro správu stavu autentizace
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
};

// Provider pro AuthContext
export const AuthContextProvider = ({ children }) => {
    // Inicializace stavu a reduceru
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    // Effect pro načtení stavu autentizace po načtení stránky
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({ type: "LOGIN", payload: user });
        }
    }, []);

    // Logika pro uložení stavu do local storage
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};