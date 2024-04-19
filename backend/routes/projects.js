// Import Express to create the router
const express = require("express");

// Create a new router object
const router = express.Router();

// Get all projects and their tasks
router.get("/", (req, res) => {
    res.json({ message: "GET all projects with their tasks" });
});

// Get a single project and its tasks by project ID
router.get("/:projectId", (req, res) => {
    res.json({ message: "GET single project with its tasks", projectId: req.params.projectId });
});

// Post a new project
router.post("/", (req, res) => {
    res.json({ message: "POST new project" });
});

// Update an entire project by ID
router.put("/:projectId", (req, res) => {
    res.json({ message: "PUT update entire project", projectId: req.params.projectId });
});

// Delete an entire project by ID
router.delete("/:projectId", (req, res) => {
    res.json({ message: "DELETE entire project", projectId: req.params.projectId });
});

// Post a new task to a specific project
router.post("/:projectId/tasks", (req, res) => {
    res.json({ message: "POST new task to a project", projectId: req.params.projectId });
});

// Get a specific task by ID from a specific project
router.get("/:projectId/tasks/:taskId", (req, res) => {
    res.json({ message: "GET specific task from a project", projectId: req.params.projectId, taskId: req.params.taskId });
});

// Update a task by ID for a specific project
router.patch("/:projectId/tasks/:taskId", (req, res) => {
    res.json({ message: "PATCH update task in a project", projectId: req.params.projectId, taskId: req.params.taskId });
});

// Delete a task by ID from a specific project
router.delete("/:projectId/tasks/:taskId", (req, res) => {
    res.json({ message: "DELETE task from a project", projectId: req.params.projectId, taskId: req.params.taskId });
});

// Update a specific task by replacing it entirely (PUT method)
router.put("/:projectId/tasks/:taskId", (req, res) => {
    res.json({ message: "PUT replace task in a project", projectId: req.params.projectId, taskId: req.params.taskId });
});

// Export the router to use in the main app
module.exports = router;