import React, { createContext, useReducer, useEffect } from "react";

// Creating and exporting the ProjectsContext
export const ProjectsContext = createContext();

// Reducer to manage the state updates based on the dispatched actions
export const projectsReducer = (state, action) => {
    switch(action.type){
        case "SET_PROJECTS":
            return {
                ...state,
                projects: action.payload
            };
        case "ADD_PROJECT":
            return {
                ...state,
                projects: [action.payload, ...state.projects]
            };
        case "REMOVE_PROJECT":
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload)
            };
        case "SET_TASKS":
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.projectId]: action.payload.tasks
                }
            };
        case "ADD_TASK":
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.projectId]: [action.payload.task, ...state.tasks[action.payload.projectId]]
                }
            };
        case "REMOVE_TASK":
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.projectId]: state.tasks[action.payload.projectId].filter(task => task._id !== action.payload.taskId)
                }
            };
        default:
            return state;
    }
};

// ProjectsContextProvider component that wraps children components to provide them access to the ProjectsContext
export const ProjectsContextProvider = ({ children }) => {
    const initialState = {
        projects: null,
        tasks: {} // Storing tasks per project
    };

    const [state, dispatch] = useReducer(projectsReducer, initialState);

    return (
        <ProjectsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProjectsContext.Provider>
    );
};