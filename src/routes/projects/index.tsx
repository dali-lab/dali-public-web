import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import projectsBackground from "@/assets/projects.png"
import { ProjectCardProps } from "@/lib/types"
import ProjectCard from "./card"

export default function Projects() {
    const { projects, isLoading } = useLoaderData() as { projects: ProjectCardProps[], isLoading: boolean };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full h-full overflow-hidden">
            <img 
                src={projectsBackground} 
                alt="Projects" 
                className="w-full h-auto object-cover max-w-none mb-5"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pt-10 overflow-scroll">
                {projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </div>
    )
}