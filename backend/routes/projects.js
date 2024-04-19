// Import Express to create the router
const express = require("express");

// Create a new router object
const router = express.Router();

// Get all projects and their tasks
router.get("/projects", (req, res) => {
    res.json({ message: "GET all projects with their tasks" });
});

// Get a single project and its tasks by project ID
router.get("/projects/:projectId", (req, res) => {
    res.json({ message: "GET single project with its tasks", projectId: req.params.projectId });
});

// Post a new task to a specific project
router.post("/projects/:projectId/tasks", (req, res) => {
    res.json({ message: "POST new task to a project", projectId: req.params.projectId });
});

// Update a task by ID for a specific project
router.patch("/projects/:projectId/tasks/:taskId", (req, res) => {
    res.json({ message: "UPDATE task in a project", projectId: req.params.projectId, taskId: req.params.taskId });
});

// Delete a task by ID from a specific project
router.delete("/projects/:projectId/tasks/:taskId", (req, res) => {
    res.json({ message: "DELETE task from a project", projectId: req.params.projectId, taskId: req.params.taskId });
});

// Export the router to use in the main app
module.exports = router;