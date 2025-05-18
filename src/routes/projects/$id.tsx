import { useParams, Link, useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { motion } from "framer-motion";
import type { ProjectCardProps } from "@/lib/types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { QueryClient } from '@tanstack/react-query';

const NOTION_API_KEY = import.meta.env.VITE_NOTION_API_KEY;

const fetchProject = async (id: string) => {
    const response = await fetch(`/api/notion/v1/pages/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${NOTION_API_KEY}`,
            'Notion-Version': '2022-02-22',
        }, 
    });
    if (!response.ok) {
        throw new Error(`Notion API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    const blocksRes = await fetch(`/api/notion/v1/blocks/${id}/children`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${NOTION_API_KEY}`,
            'Notion-Version': '2022-02-22',
        }
    });

    if (!blocksRes.ok) {
        throw new Error(`Notion API error: ${blocksRes.status} ${blocksRes.statusText}`);
    }

    const blocksData = await blocksRes.json();
    
    // Get all paragraph blocks and join their text
    const description = blocksData.results
        .filter((block: any) => block.type === 'paragraph' && block.paragraph?.rich_text?.length > 0)
        .map((block: any) => block.paragraph.rich_text[0].plain_text)
        .join(' ');
    
    const props = data.properties;
    const project: ProjectCardProps = {
        id: data.id,
        title: props["Name"]?.title?.[0]?.plain_text ?? '',
        description: (description || props["Description"]?.rich_text?.[0]?.plain_text) ?? '',
        image: data.cover?.type === 'external'
            ? data.cover.external?.url
            : data.cover?.type === 'file'
            ? data.cover.file?.url
            : '',
        keywords: [
            ...(props["design medium"]?.multi_select?.map((k: any) => k.name) ?? []),
            ...(props["tech stack"]?.multi_select?.map((k: any) => k.name) ?? [])
        ],
        term: props["terms"]?.multi_select?.map((t: any) => t.name) ?? [],
    };
    
    return project;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes
                gcTime: 10 * 60 * 1000, // 10 minutes
            },
        },
    });
    try {
        const project = await queryClient.fetchQuery({
            queryKey: ['project', params.id],
            queryFn: () => fetchProject(params.id!),
        });
        return { project };
    } catch (error) {
        console.error('Error loading project:', error);
        return { project: null };
    }
}

export default function ProjectDetail() {
    const { project } = useLoaderData() as { project: ProjectCardProps | null };

    if (!project) {
        return (
            <div className="w-full h-full p-8 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
                    <p className="text-gray-600 mb-4">The project you're looking for doesn't exist or has been removed.</p>
                    <Link to="/projects" className="text-dali-blue hover:text-dali-blue/80">
                        Return to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full p-8"
        >
            <div className="max-w-4xl mx-auto flex flex-col">
                <div className="flex flex-row items-center gap-2 mb-5 ml-2">
                    <Link to="/projects" className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-2">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Projects
                    </Link>
                </div>
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-video w-full overflow-hidden rounded-lg mb-6"
                >
                    {project.image ? (
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <p>No image available</p>
                        </div>
                    )}
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold mb-4"
                >
                    {project.title}
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 mb-6 whitespace-pre-wrap"
                >
                    {project.description}
                </motion.p>

                {project.keywords && project.keywords.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-2 mb-6"
                    >
                        {project.keywords.map((keyword) => (
                            <span 
                                key={keyword}
                                className="bg-gray-300 px-3 py-1 rounded-lg text-sm text-gray-600"
                            >
                                {keyword}
                            </span>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
} 