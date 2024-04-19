// Import mongoose for schema definition and model creation
const mongoose = require('mongoose');

// Define Mongoose Schema
const Schema = mongoose.Schema;

// Project schema definition
const projectSchema = new Schema({
    // Project name
    name: {
        type: String,
        required: true
    },
    // Timer setting for tasks in the project in minutes
    tasksTimer: {
        type: Number,
        default: 25
    },
    // Number of tasks in the project
    tasksNumber: {
        type: Number,
        default: 1
    },
    // User ID reference to the owner of the project
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true
});

// Create and export the Project model to interact with the Projects collection
module.exports = mongoose.model("Project", projectSchema);
