import { ProjectsContext } from "../context/ProjectsContext"
import { useContext } from "react"

export const useProjectsContext = () => {
    const context = useContext(ProjectsContext)

    // This check ensures that the hook is used within a component wrapped by the ProjectsContextProvider
    if (!context) {
        throw Error("useProjectsContext must be used inside ProjectsContextProvider")
    }

    return context
}