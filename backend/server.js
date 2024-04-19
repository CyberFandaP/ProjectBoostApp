// Load environment variables from .env file for secure access to credentials
require("dotenv").config();

// Import the Express module to facilitate web server functionality
const express = require("express");

// Import Mongoose to enable MongoDB interactions
const mongoose = require("mongoose");

// Import routes for user authentication and project management
const projectRoutes = require('./routes/projects');  // Adjust the path as needed
const userRoutes = require('./routes/user');  // Adjust the path as needed

// Initialize the Express application
const app = express();

// Middleware to parse JSON bodies. This enables us to access request data easily.
app.use(express.json());

// Middleware for logging request details to help with debugging
app.use((req, res, next) => {
    console.log(req.path, req.method); // Logs the path and method of each request to the console
    next(); // Proceed to the next middleware or route handler
});

// Route handling
// Base path for projects API
app.use("/api/projects", projectRoutes);

// Base path for user authentication API
app.use("/api/user", userRoutes);

// Establish a connection to the MongoDB database using the URI provided in the .env file
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for HTTP requests on the port specified in the .env file after a successful database connection
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB & listening on port", process.env.PORT);
        });
    })
    .catch((error) => {
        // Handle errors that occur during database connection
        console.log("Error connecting to MongoDB:", error);
    });

// Export the configured app for potential use in testing or other server setups
module.exports = app;