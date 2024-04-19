const Project = require("../models/projectModel");
const Task = require("../models/taskModel");
const mongoose = require("mongoose");

// Get all projects and their associated tasks
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user._id }).populate('tasks');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single project and its tasks
const getProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findById(projectId).populate('tasks');
        if (!project) {
            return res.status(404).json({ error: "No such project" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new project and potentially initial tasks
const createProject = async (req, res) => {
    const { name, tasksTimer, tasksNumber } = req.body;
    try {
        const project = await Project.create({ name, tasksTimer, tasksNumber, userId: req.user._id });
        // Optional: Create initial tasks if tasksNumber is specified
        if (tasksNumber > 0) {
            // Create tasks with empty text
            const tasks = Array.from({ length: tasksNumber }, () => ({
                text: "", // Initially, the text will be empty
                projectId: project._id
            }));
            await Task.insertMany(tasks);
        }
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a project
const updateProject = async (req, res) => {
    const { projectId } = req.params;
    const { name, tasksTimer } = req.body; // Example fields that might be updated
    try {
        const project = await Project.findByIdAndUpdate(projectId, { name, tasksTimer }, { new: true });
        if (!project) {
            return res.status(404).json({ error: "No such project" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a project
const deleteProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findByIdAndDelete(projectId);
        if (!project) {
            return res.status(404).json({ error: "No such project" });
        }
        await Task.deleteMany({ projectId: project._id }); // Delete associated tasks
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Additional task-specific controller methods can be defined here...

// Export controller functions
module.exports = {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
};