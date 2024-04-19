import React from 'react';
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProjectDetails = () => {
    const { projects } = useProjectsContext(); // Přístup k projektům z kontextu
    const { user } = useAuthContext(); // Přístup k uživatelským datům z kontextu

    const handleDeleteProject = async (projectId) => {
        if (!user) return;

        const response = await fetch(`/api/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${user.token}`,
            },
        });
        const json = await response.json();

        if (response.ok) {
            // Zde by byla vhodná logika pro odstranění projektu z kontextu
            console.log('Project deleted:', projectId);
        }
    };

    return (
        <div>
            {projects && projects.map(project => (
                <div key={project._id} className="project-details">
                    <h4>{project.name}</h4>
                    <p>Timer setting: {project.tasksTimer} minutes</p>
                    <p>Number of tasks: {project.tasksNumber}</p>
                    <p>Created: {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</p>
                    <div className="tasks">
                        {project.tasks && project.tasks.map(task => (
                            <div key={task._id} className="task">
                                <p>{task.text || 'No description'}</p>
                                <p>Status: {task.state}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => handleDeleteProject(project._id)} className="delete">
                        Delete Project
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProjectDetails;