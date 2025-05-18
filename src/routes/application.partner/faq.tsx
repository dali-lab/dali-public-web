import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/accordion"

export default function faq() {

    return (
        <Accordion type="single" collapsible className="w-full pl-5 pr-10 pt-1">
            <AccordionItem value="item-1">
                <AccordionTrigger>What is DALI?</AccordionTrigger>
                <AccordionContent>
                DALI collaborates with partners to bring their ideas to life through teams of product managers, designers, and developers. Our students also bring expertise across graphics, data, engineering, AR/VR, and digital arts.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>What does the DALI process look like?</AccordionTrigger>
                <AccordionContent>
                Our teams work in ten-week sprints. 
                Here's what happens in one sprint: During the term, our design team starts with extensive UI/UX research and our team creates a detailed project scope. The design team then develops comprehensive, interactive prototypes showing the complete product flow. Meanwhile, our developers begin implementing this vision. At the of the term, we showcase your project at Technigala—Dartmouth's premier tech exhibition—where you can interact with the finished product. For projects in their final term, we conduct a thorough handoff process to ensure you have full access and ownership of the project.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>What does the application process look like for a potential DALI partner?</AccordionTrigger>
                <AccordionContent>
                Applications for each term are rolling. Our DALI teams work during Fall (Sep-Dec), Winter (Jan-Mar), Spring (Apr-Jun), and Summer term (Jun-Aug). We do not accept new projects for Summer term—summer projects are solely continuing projects.
                First, submit your application. Our team will reach out to schedule an initial interview call. If there's mutual interest, we'll create a detailed scope of work that outlines the project specifics, design and development challenges, project duration, and key expectations. Once both parties approve the scope, we'll finalize the contract and payment terms. Then we'll assemble your project team and set up your project hub. On day one of the term, our partner sourcing lead will introduce you to the DALI team who will bring your project to life!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>How long would my DALI project take?</AccordionTrigger>
                <AccordionContent>
                Project timelines vary significantly based on scope. Most projects span two ten-week terms, while some extend over multiple years. Single-term projects are rare. We follow DALI's ten-week sprint process throughout, with each term being carefully scoped. At the end of each term, you'll know exactly what to expect and can experience the results firsthand at Technigala.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>What would my involvement with the team look like?</AccordionTrigger>
                <AccordionContent>
                Each week, you'll meet with the team to review progress and provide input on current work and future direction. We expect timely responses over Slack and email—your feedback is important as the team builds!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
                <AccordionTrigger>How much does a DALI team cost?</AccordionTrigger>
                <AccordionContent>
                For one 10-week term, a full team of designers and developers costs $18,000, while a half team (significantly smaller) costs $9,000. Most projects require a full team and multiple terms.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
                <AccordionTrigger>What are examples of previous projects DALI has worked on?</AccordionTrigger>
                <AccordionContent>
                We have worked with YC-backed founders, major companies, medical schools, research labs, and museums to ship MVPs in as little as 10 weeks with extensive UI/UX research and design. Check out the projects tab for examples of past projects!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
                <AccordionTrigger>What does IP and code ownership look like before and after my time at DALI?</AccordionTrigger>
                <AccordionContent>
                When applying, your idea remains secure. We do not discuss proposed projects in any public setting and restrict access to project applications. We typically don’t sign NDAs in early discussions as what makes a project succeed is the particular passion of the founders. Ideas by themselves without implementation, unless they are specifically protectable by patents, do not have value without the specific motivations of the founding team.
                We will grant to you the IP that is created for you by DALI students. You will have rights to any code/designs created. We work with the Technology Transfer Office to make sure all the IP assignments are in place. As an academic institution we do retain rights for certain educational purposes. The students who worked on the project want to be able to show some part of their work as part of their portfolios and/or publish case studies.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
                <AccordionTrigger>What happends if I have bugs after the term ends?</AccordionTrigger>
                <AccordionContent>
                DALI will provide bug fixes and maintenance within 30 days of handoff. After this period, we charge $30 per hour for bug fixes or new features, which increases to $50 per hour after 90 days. Any work beyond the initial 30-day period depends on DALI staff availability.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}