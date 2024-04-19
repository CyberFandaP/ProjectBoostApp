const Project = require("../models/projectModel");
const Task = require("../models/taskModel");

// Retrieves all projects created by the logged-in user along with their associated tasks
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user._id }).populate('tasks');
        res.status(200).json(projects);
    } catch (error) {
        console.error("Failed to retrieve projects:", error);
        res.status(500).json({ error: error.message });
    }
};

// Retrieves a single project by its ID along with all associated tasks
const getProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findById(projectId).populate('tasks');
        if (!project) {
            return res.status(404).json({ error: "No such project" });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error("Error fetching project with ID:", projectId, error);
        res.status(500).json({ error: error.message });
    }
};

// Creates a new project and optionally a specified number of tasks with empty content
const createProject = async (req, res) => {
    const { name, tasksTimer, tasksNumber } = req.body;
    try {
        const project = await Project.create({ name, tasksTimer, tasksNumber, userId: req.user._id });
        let tasks = [];
        if (tasksNumber > 0) {
            tasks = Array.from({ length: tasksNumber }, () => ({ text: "", projectId: project._id }));
            tasks = await Task.insertMany(tasks);
        }
        project.tasks = tasks.map(task => task._id);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error("Failed to create project:", error);
        res.status(400).json({ error: error.message });
    }
};

// Updates a project's name and task timer based on provided values
const updateProject = async (req, res) => {
    const { projectId } = req.params;
    const { name, tasksTimer } = req.body;
    try {
        const project = await Project.findByIdAndUpdate(projectId, { name, tasksTimer }, { new: true });
        if (!project) {
            return res.status(404).json({ error: "No such project" });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error("Failed to update project:", projectId, error);
        res.status(400).json({ error: error.message });
    }
};

// Deletes a project and all its associated tasks
const deleteProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findByIdAndDelete(projectId);
        if (!project) {
            return res.status(404).json({ error: "No such project" });
        }
        await Task.deleteMany({ projectId: project._id });
        res.status(200).json({ message: "Project and associated tasks deleted successfully" });
    } catch (error) {
        console.error("Failed to delete project:", projectId, error);
        res.status(500).json({ error: error.message });
    }
};

// Retrieves all tasks associated with a specific project
const getAllTasks = async (req, res) => {
    const { projectId } = req.params;
    try {
        const tasks = await Task.find({ projectId }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Failed to retrieve tasks for project:", projectId, error);
        res.status(500).json({ error: error.message });
    }
};

// Retrieves a specific task by its ID
const getTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: "No such task" });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error("Failed to retrieve task:", taskId, error);
        res.status(500).json({ error: error.message });
    }
};

// Creates a new task within a project with provided text and state
const createTask = async (req, res) => {
    const { projectId } = req.params;
    const { text, state } = req.body;
    try {
        const task = await Task.create({ text, state, projectId });
        res.status(201).json(task);
    } catch (error) {
        console.error("Failed to create task in project:", projectId, error);
        res.status(400).json({ error: error.message });
    }
};

// Updates an existing task with provided data
const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const updateData = req.body;
    try {
        const task = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
        if (!task) {
            return res.status(404).json({ error: "No such task" });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error("Failed to update task:", taskId, error);
        res.status (400).json({ error: error.message });
    }
};

// Deletes a specific task
const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).json({ error: "No such task" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Failed to delete task:", taskId, error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};