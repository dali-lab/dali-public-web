import { useState, useEffect } from "react";
import Navbar from "~/components/navbar";
import projectsBackground from "../../../public/projects.png"
import { ProjectCardProps } from "~/lib/types"
import projectsData from "./projectsData.json"
import ProjectCard from "./card"

export default function Projects() {
    const [projects, setProjects] = useState<ProjectCardProps[]>([])
    useEffect(() => {
        setProjects(projectsData.projects)
    }, [])
    return (
        <div className="w-full h-full overflow-hidden">
            <Navbar />
            <img 
                src={projectsBackground} 
                alt="Projects" 
                className="w-full h-auto object-cover max-w-none"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
                {projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </div>
    )
}