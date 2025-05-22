import type { PersonProps } from "@/lib/types"
import timImage from "@/assets/tim.jpg"
import madisonImage from "@/assets/madison.jpeg"
import papeImage from "@/assets/pape.jpeg"
import loebImage from "@/assets/lorie.png"
import { QueryClient } from '@tanstack/react-query'

const NOTION_API_KEY = import.meta.env.VITE_NOTION_API_KEY;
const DATABASE_ID = import.meta.env.VITE_NOTION_MEMBERS_DATABASE_ID;

const fetchPeople = async () => {
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
    
    const formattedMembers: (PersonProps | null)[] = data.results.map((page: any) => {
        const properties = page.properties;
        const name = properties["Name"]?.title?.[0]?.plain_text || '';

        const roles = properties["role"]?.multi_select?.map((r: any) => r.name) || [];
        const coreRoles = properties["core role"]?.multi_select?.map((c: any) => c.name) || [];

        const year = properties["year"]?.multi_select?.map((y: any) => y.name) || [];
        const terms = properties["terms in dali"]?.multi_select?.map((t: any) => t.name) || [];
        
        const image =
            properties["profile"]?.files?.map((file: any) =>
            file?.file?.url || file?.external?.url || ''
            )?.filter((url: string) => url !== '') || [];

        if (!name || year < 25) {
            return null;
        }

        return {
            id: page.id,
            name,
            roles: [...roles, ...coreRoles],
            year,
            terms,
            image,
            isStaff: false,
            isCore: coreRoles.length > 0,
        };
    });

    const staff = [
        {
            id: "1",
            name: "Tim Tregubov",
            roles: ["Director"],
            year: "", 
            terms: [],
            image: timImage,
            isStaff: true,
            isCore: false,
        },
        {
            id: "2",
            name: "Madison Dunaway",
            roles: ["Program Manager"],
            year: "",
            terms: [],
            image: madisonImage,
            isStaff: true,
            isCore: false,
        },
        {
            id: "3",
            name: "Pape Sow Traore",
            roles: ["Technical Fellow"],
            year: "",
            terms: [],
            image: papeImage,
            isStaff: true,
            isCore: false,
        },
        {
            id: "4",
            name: "Lorie Loeb",
            roles: ["Faculty Advisor"],
            year: "",
            terms: [],
            image: loebImage,
            isStaff: true,
            isCore: false,
        }
    ]
    
    // Filter out null values before combining with staff
    const validMembers = formattedMembers.filter((member): member is PersonProps => member !== null);
    return [...validMembers, ...staff];
}

export async function loader() {
    const queryClient = new QueryClient();
    const members = await queryClient.fetchQuery({
        queryKey: ['people'],
        queryFn: fetchPeople,
    });

    return { members };
}

export default loader