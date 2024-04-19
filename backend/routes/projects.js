const express = require("express");
const {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
} = require("../controllers/projectController");
const requireAuth = require("../middleware/requireAuth");  // Import the authentication middleware

const router = express.Router();

// Apply the requireAuth middleware to all routes in this router
router.use(requireAuth);

// Project routes that now all require authentication
router.get("/", getAllProjects);
router.get("/:projectId", getProject);
router.post("/", createProject);
router.put("/:projectId", updateProject);
router.delete("/:projectId", deleteProject);

module.exports = router;