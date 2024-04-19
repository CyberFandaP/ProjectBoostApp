// Import mongoose for schema definition and model creation
const mongoose = require('mongoose');

// Define Mongoose Schema
const Schema = mongoose.Schema;

// Task schema definition
const taskSchema = new Schema({
    // Task description text
    text: {
        type: String,
        required: true
    },
    // Task state with predefined values
    state: {
        type: String,
        enum: ['completed', 'not completed'],
        default: 'not completed'
    },
    // Reference to the Project ID to which the task belongs
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
}, {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true
});

// Create and export the Task model to interact with the Tasks collection
module.exports = mongoose.model("Task", taskSchema);