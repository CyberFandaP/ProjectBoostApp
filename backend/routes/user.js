// Import Express to create the router
const express = require("express");

// Create a new router object
const router = express.Router();

//-----------Login route-----------//
// POST: /login
router.post("/login", (req, res) => {
    res.json({ message: "Login request received" });
});

//------------Signup route-----------//
// POST: /signup
router.post("/signup", (req, res) => {
    res.json({ message: "Signup request received" });
});

// Export the router to use in the main app
module.exports = router;