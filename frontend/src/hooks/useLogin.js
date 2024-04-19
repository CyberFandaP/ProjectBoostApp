import { useState } from "react";
import { useAuthContext } from "./useAuthContext"; // Import to use the authentication context

export const useLogin = () => {
    const [error, setError] = useState(null); // State to hold any error messages
    const [isLoading, setIsLoading] = useState(false); // State to manage loading status during API request
    const { dispatch } = useAuthContext(); // Retrieve dispatch from useAuthContext for updating global state

    const login = async (email, password) => {
        setIsLoading(true); // Start the loading process
        setError(null); // Clear any existing errors

        try {
            // Perform the POST request to the login API endpoint
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password }) // Send user credentials in the request body
            });
            const json = await response.json(); // Parse JSON response

            if (!response.ok) {
                // If response is not ok, update error state with the error message from the server
                setIsLoading(false); // Stop the loading process
                setError(json.error); // Set error state with server's error message
            } else {
                // If the response is ok, proceed to log the user in
                localStorage.setItem("user", JSON.stringify(json)); // Store user info in local storage

                // Update global state to reflect user is now logged in
                dispatch({ type: "LOGIN", payload: json });
                setIsLoading(false); // Stop the loading process
            }
        } catch (error) {
            // Catch any network or other errors
            setIsLoading(false); // Stop the loading process
            setError("Failed to login"); // Set error state with a generic login failure message
        }
    };

    return { login, isLoading, error }; // Expose the login function and states to components
}