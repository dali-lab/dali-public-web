import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/accordion"

export default function faq() {

    return (
        <Accordion type="single" collapsible className="w-full px-5">
            <AccordionItem value="item-1">
                <AccordionTrigger>Shoot, the deadline is coming up really fast, can I get an extension?</AccordionTrigger>
                <AccordionContent>
                We handle extensions requests on a case-by-case basis. If you foresee needing extra time, please email us as early as possible! If you do not email asking for an extension by the deadline, your request will not be considered. Applications submitted after the deadline or your extension deadline will also not be considered.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>I'm a first-year and don't have that many skills - can I still apply to DALI?</AccordionTrigger>
                <AccordionContent>
                Yes, absolutely! We take into consideration your year in our hiring process, so don't expect to be compared to a senior with three internships under their belt!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>When will I hear back?</AccordionTrigger>
                <AccordionContent>
                We try to deliver hiring decisions get back to applicants by the end of the term. We know it's slow, but your applications are just so good that it takes us a lot of deliberation to make decisions!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>I applied before. Can I get my previous application for reference?</AccordionTrigger>
                <AccordionContent>
                Send an email to either re-submit the same application or get your old application! We do, however, recommend making improvements to any new application to reflect the growth and learning you’ve done since you last applied!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>I have a question that isn't in the F.A.Q.</AccordionTrigger>
                <AccordionContent>
                Email us and we’ll get back to you as soon as we can!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
                <AccordionTrigger>I got accepted into the Lab, but I want to defer my application, is this allowed?</AccordionTrigger>
                <AccordionContent>
                Deferrals will be evaluated on a case-by-case basis. Please reach out if you have any questions about this policy.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}