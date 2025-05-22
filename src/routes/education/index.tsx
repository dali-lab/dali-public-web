import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { Calendar } from "@/components/ui/calendar"
import { Workshop } from "@/lib/types"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
  } from "@/components/modal"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type WorkshopData = {
    workshops: Workshop[]
}

const NOTION_API_KEY = import.meta.env.VITE_NOTION_API_KEY;
const DATABASE_ID = import.meta.env.VITE_NOTION_EDUCATION_DATABASE_ID;
const API_URL = '/api/notion';  // Simplified to use the proxy endpoint

const fetchWorkshops = async () => {
    try {
        console.log('Fetching workshops with:', {
            apiUrl: API_URL,
            databaseId: DATABASE_ID,
            hasApiKey: !!NOTION_API_KEY
        });

        const response = await fetch(`${API_URL}/v1/databases/${DATABASE_ID}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-02-22',
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Notion API error response:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });
            throw new Error(`Notion API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Notion API response:', data);

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
        return { workshops: [] };
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

export default function Education(): JSX.Element {
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
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full md:h-[95vh] lg:h-[60vh] mt-20">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[97%] h-[1px] bg-gray-300"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-[1px] bg-gray-300"></div>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
                    <div className="p-6 overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-2">Workshops</h3>
                        <p className="text-sm">At DALI, our workshops empower students with practical, career-ready skills through hands-on sessions led by experienced peers. From cracking tech interviews and building personal websites to mastering deep learning, design tools, and networking, there's something for every aspiring developer, designer, or PM. We blend technical learning with real-world application to help you stand out and succeed. Whether you're just starting out or looking to level up, our workshops are built to support your growth.
                        Check out our calendar for upcoming workshops!
                        </p>
                    </div>
                    <div className="p-6 overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-2">Mini-Series</h3>
                        <p className="text-sm">DALI Lab's Mini-Series are multi-session workshops designed to help students build deep, specialized skills across areas like design, development, data, and recruiting. Each series breaks down complex topics—such as UI/UX design, web development, or data science—into engaging, bite-sized sessions that build on each other. Whether you're exploring animation, diving into advanced design, or preparing for tech recruiting, these guided learning paths offer structure, mentorship, and plenty of hands-on practice. Perfect for learners who want to go beyond the basics and gain real fluency in a focus area.
                        Check out our calendar for upcoming mini-series!
                        </p>
                    </div>
                    <div className="p-6 overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-2">WISP</h3>
                        <p className="text-sm">The Women in Science Project (WISP) at DALI Lab offers an incredible opportunity for first-year students to gain real-world experience in tech through a two-term internship. After an interview process, interns join a team to build functional apps or web applications while learning essential development and design skills. With mentorship from experienced DALI team members, WISP interns grow their technical abilities, collaborate on meaningful projects, and explore careers in STEM in a supportive environment. Learn more about applying <a href="https://students.dartmouth.edu/wisp/internships/applying-wisp-internships" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline cursor-pointer">here.</a></p>
                    </div>
                    <div className="p-6 overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-2">EE Just</h3>
                        <p className="text-sm">The E.E. Just DALI Internship is a two-term, paid opportunity for first-year and sophomore students committed to the mission of the E.E. Just Program. Interns join the DALI Lab during the Winter and Spring terms to build real-world digital tools—like web apps, VR/AR experiences, and data visualizations—while learning key design and development skills in a collaborative, team-based environment. In addition to lab work, interns participate in weekly E.E. Just Jam Sessions and Science Forums, and receive mentorship and professional development support from both DALI and E.E. Just communities. This internship is ideal for students interested in exploring the intersection of technology, design, and inclusive innovation. For more information and to apply, visit the <a href="https://students.dartmouth.edu/eejust/undergraduate/fellowships-internships/ee-just-dali-internship" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline cursor-pointer">E.E. Just DALI Internship page.</a></p>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-4">
                <div className="pt-10 w-full h-full flex flex-col lg:flex-row items-center justify-center">
                    <Calendar workshops={workshops} setSelectedWorkshop={setSelectedWorkshop} />
                    <Dialog open={!!selectedWorkshop} onOpenChange={() => setSelectedWorkshop(null)}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{selectedWorkshop?.title}</DialogTitle>
                                <DialogDescription>
                                    {selectedWorkshop?.domain.join(", ")}
                                </DialogDescription>
                            </DialogHeader>
                            <iframe src={selectedWorkshop?.url} className="w-full h-full" />
                            <DialogFooter>
                                <Button type="submit">Enroll</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

            </div>
        </div>
    )
}