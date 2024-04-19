// Import the User model
const User = require("../models/userModel");
// Import JWT for token generation
const jwt = require("jsonwebtoken");

// Helper function to generate a JWT token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

// Controller for user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email: user.email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const signupUser = async (req, res) => {
    const { email, username, password } = req.body;
    console.log("Attempting to sign up with:", email, username);

    try {
        const exists = await User.findOne({ $or: [{ email }, { username }] });
        console.log("User exists check:", exists);
        if (exists) {
            throw Error("Email or username already in use");
        }

        const user = await User.signup(email, username, password);
        console.log("Signed up user:", user);
        const token = createToken(user._id);
        res.status(200).json({ email: user.email, username: user.username, token });
    } catch (error) {
        console.log("Signup error:", error.message);
        res.status(400).json({ error: error.message });
    }
};

// Export the controller functions
module.exports = { signupUser, loginUser };