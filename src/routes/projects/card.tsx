import { Link } from 'react-router-dom'
import type { ProjectCardProps } from "@/lib/types"
import { motion } from "framer-motion"

export default function ProjectCard ({
    id,
    title,
    description,
    image,
    keywords,
    term,
}: ProjectCardProps) {
    return (
        <Link to={`/projects/${id}`}>
            <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col flex-start py-2 px-5"
            >
                {image ?
                <motion.img 
                    src={image} 
                    alt={title} 
                    className="w-full h-[240px] object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
                :<div className="w-full h-[240px] bg-gray-200">
                    <p>No image</p>
                </div>
                }
                <motion.h1 
                    className="text-base pt-2 pl-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {title}
                </motion.h1>
                <motion.p 
                    className="text-xs text-gray-500 pt-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {description}
                </motion.p>
                {keywords.length > 0 && (
                    <motion.div 
                        className="flex flex-wrap gap-2 pt-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {keywords.map((w) => (
                            <div key={w} className="bg-gray-200 rounded-sm px-2 py-1">
                                <p className="text-xs text-gray-500">{w}</p>
                            </div>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </Link>
    )
}