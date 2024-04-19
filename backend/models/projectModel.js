const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tasksTimer: {
        type: Number,
        default: 25
    },
    tasksNumber: {
        type: Number,
        default: 1
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }] // Reference to the array of tasks
}, {
    timestamps: true
});

module.exports = mongoose.model("Project", projectSchema);