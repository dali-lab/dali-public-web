import { Separator } from "@/components/ui/separator"

export default function WhyDali () {
    return (
        <div className="w-full h-full flex flex-col overflow-hidden pl-5 pr-10 pt-2">
            <div className="flex flex-col gap-5"> 
                <p>We demo and test every project</p>
                <p>See for yourself at Technigala, our end of term event</p>
                <p>
                    This is a great time to come and view our projects and to talk with students and partners about their ideas, solutions, and process.
                </p>
            </div>
            <Separator />
            <div>
                <p>We work on a wide range of projects</p>
                <div className="flex flex-row gap-5">
                    <p>Four criteria for a great project proposal:</p>
                    <p>Potential for impact</p>
                    <p>Educational for our students</p>
                    <p>Compatibility with our skill sets</p>
                    <p>Technically feasible</p>
                </div>
            </div>
            <Separator />
            <div>
                <p>Other ways to be involved:</p>
                <div>
                    <p>Compete in The Pitch</p>
                    <p>The Pitch event is an opportunity for members of the Dartmouth Community to pitch a project idea and ask for support through design, development, and/or funding. Winning DALI projects jump the application process and start the subsequent term.</p>
                </div>
                <div>
                    <p>Give a workshop or talk</p>
                    <p>We are always eager to bring new ideas into DALI. If you have a skill, passion, or relevant experience, we'd love to talk with you about sharing with our students!</p>
                </div>
                <div>
                    <p>Support a project</p>
                    <p>When we partner with a student, researcher, or nonprofit, the project is often unfunded. If you are interested in supporting a team or student, we would love to hear from you.</p>
                </div>
            </div>
        </div>
    )
}