// Import required libraries
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const validator = require("validator");

// Define Mongoose Schema
const Schema = mongoose.Schema;

// User schema definition with additional 'username' field
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Static method to sign up a new user
userSchema.statics.signup = async function(email, username, password) {
    if (!email || !username || !password) {
        throw Error("All fields must be filled");
    }

    // Validate email
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }

    // Validate password strength
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
    }

    // Check if email or username already exists in the database
    const exists = await this.findOne({ $or: [{ email }, { username }] });
    if (exists) {
        throw Error("Email or username already in use");
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create and return the new user
    const user = await this.create({ email, username, password: hash });
    return user;
};

// Static method to log in a user
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    // Find user by email
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Incorrect email");
    }

    // Compare entered password with hashed password in database
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
};

// Export the model
module.exports = mongoose.model("User", userSchema);