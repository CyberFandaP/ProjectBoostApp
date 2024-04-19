import React, { useEffect } from 'react';
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Import komponenty ProjectDetails
import ProjectDetails from "../components/ProjectDetails";

const Home = () => {
  // Použití kontextů pro projekty a autentizaci
  const { projects, dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProjects = async () => {
      if (user) {
        const response = await fetch("/api/projects", {
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        });
        const json = await response.json();
        if (response.ok) {
          // Nastavení projektů do stavu pomocí dispatch
          dispatch({ type: "SET_PROJECTS", payload: json });
        }
      }
    };

    fetchProjects();
  }, [user, dispatch]); // Závisí na uživateli a dispatch funkci z kontextu

  return (
    <div className="home">
        <h1>Welcome to the Project Dashboard</h1>
        <div className="projects">
          {/* Mapování přes pole projektů a zobrazení každého z nich */}
          {projects && projects.map((project) => (
            <ProjectDetails key={project._id} project={project} />
          ))}
        </div>
    </div>
  );
}

export default Home;