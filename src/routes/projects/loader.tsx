import type { ProjectCardProps } from "@/lib/types";
import { QueryClient } from '@tanstack/react-query'

const NOTION_API_KEY = import.meta.env.VITE_NOTION_API_KEY;
const DATABASE_ID = import.meta.env.VITE_NOTION_PROJECTS_DATABASE_ID;

const fetchProjects = async () => {
    try {
        const response = await fetch(`/api/notion/v1/databases/${DATABASE_ID}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-02-22',
            },
        });
        if (!response.ok) {
            throw new Error(`Notion API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Projects data:', data);
        
        const formattedProjects: ProjectCardProps[] = data.results
            .map((page: any): ProjectCardProps | null => {
                const props = page.properties;

                if (!props) return null;

                const title = props["Name"]?.title?.[0]?.plain_text ?? '';
                const description = props["Description"]?.rich_text?.[0]?.plain_text ?? '';
                const image = page.cover?.type === 'external'
                    ? page.cover.external?.url
                    : page.cover?.type === 'file'
                    ? page.cover.file?.url
                    : '';
                const designMedium = props["design medium"]?.multi_select?.map((k: any) => k.name) ?? [];
                const techStack = props["tech stack"]?.multi_select?.map((k: any) => k.name) ?? [];
                const term = props["terms"]?.multi_select?.map((t: any) => t.name) ?? [];

                if (!title) return null;

                return {
                    id: page.id,
                    title,
                    description,
                    image,
                    keywords: [...designMedium, ...techStack],
                    term,
                };
            })
            .filter((project: ProjectCardProps | null): project is ProjectCardProps => project !== null)
            .filter((project: ProjectCardProps) => project.term.includes("25S"));

        return formattedProjects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export async function loader() {
    try {
        const queryClient = new QueryClient();
        const projects = await queryClient.fetchQuery({
            queryKey: ['projects'],
            queryFn: fetchProjects,
        });

        return { projects };
    } catch (error) {
        console.error('Error in projects loader:', error);
        throw error;
    }
}

export default loader