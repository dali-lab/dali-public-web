import { ProjectCardProps } from "../../lib/types"

export default function ProjectCard ({
    id,
    title,
    description,
    image,
    keywords,
    term,
}: ProjectCardProps) {
    return (
        <div className="flex flex-col items-center justify-center">
            <img src={image} alt={title} />
            <h1>{title}</h1>
            <p>{keywords}</p>
        </div>
    )
}