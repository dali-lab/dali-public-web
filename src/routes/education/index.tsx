import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { Calendar } from "@/components/ui/calendar"
import workshopsData from "./workshopsData.json"
import { Workshop } from "@/lib/types"
import { useQuery } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'

type WorkshopData = {
    workshops: Workshop[]
}

const NOTION_API_KEY = import.meta.env.VITE_NOTION_API_KEY;
const DATABASE_ID = import.meta.env.VITE_NOTION_EDUCATION_DATABASE_ID;

const fetchWorkshops = async () => {
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

        const workshops = data.results.map((result: any) => {
            // timezone conversion from UTC to EST
            const dateStr = result.properties.Date.date?.start;
            let date = new Date();
            
            if (dateStr) {
                date = new Date(dateStr);
                date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            }

            if (!result.properties.Name.title[0]?.plain_text) {
                return null;
            }

            return {
                id: result.id,
                title: result.properties.Name.title[0]?.plain_text || 'Untitled Workshop',
                date: date.toISOString(),
                location: result.properties.Location?.rich_text[0]?.plain_text || 'TBD',
                url: result.url,
                domain: result.properties.Domain?.multi_select?.map((domain: any) => domain.name) || [],
                term: result.properties.Term?.multi_select?.map((term: any) => term.name) || [],
            };
        }).filter((workshop: Workshop) => workshop !== null);

        return { workshops };
    } catch (error) {
        console.error('Error fetching workshops:', error);
        return workshopsData;
    }
}

export async function loader() {
    const queryClient = new QueryClient();
    const data = await queryClient.fetchQuery({
        queryKey: ['workshops'],
        queryFn: fetchWorkshops,
    });

    return { workshops: data?.workshops || [] };
}

export default function Education() {
    const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
    const { workshops } = useLoaderData() as { workshops: Workshop[] };
    const { isLoading } = useQuery({
        queryKey: ['workshops'],
        queryFn: fetchWorkshops,
        initialData: { workshops },
    });
    
    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }
    
    return (
        <div className="w-full h-full flex lg:flex-col xl:flex-row items-center justify-center p-4">
            <div className="pt-10 w-full h-full flex flex-col items-center justify-center">
                <Calendar workshops={workshops} />
            </div>

        </div>
    )
}