import { motion } from "framer-motion";
import aboutVideo from "@/assets/dali.mp4"
import daliNumber from "@/assets/dali-numbers.png"
export default function About() {
    return (
        <div className="w-full min-h-screen flex flex-col bg-sidebar">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-screen relative overflow-hidden"
            >
                <div className="absolute inset-0 w-full h-full">
                    <video src={aboutVideo} autoPlay muted loop className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-white text-center px-4"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">DALI Lab</h1>
                        <p className="text-xl md:text-2xl">An experiential, student-driven learning lab</p>
                    </motion.div>
                </div>
            </motion.div>
            <div className="w-full px-[20%] py-[10%] bg-dali-background">
                <p className="text-2xl font-bold mb-4">WHO WE ARE</p>
                <p className="mb-4">DALI Lab is a student-driven technology agency at Dartmouth College that designs and builds early-stage mobile, web, and AR/VR products.</p>
                <p>Students are employed to work in teams to develop, design, and create solutions for community and global partners. Lab members apply their classroom learning to real-world, industry-standard projects in a community of like-minded individuals.</p>
            </div>
            <img src={daliNumber} alt="DALI Number" className="w-full" />
            <div className="p-8">
                <p className="text-2xl font-bold mb-4">Our Mission</p>
                <p><span>We step up: </span>Meet challenges, pursue learning opportunities, choose to take initiative in big and small ways.</p>
                <p><span>We are tenacious: </span>Commit to bring our best effort despite setbacks, and persevere through the bugs, the crits, and the occasional lack of snacks.</p>
                <p><span>We believe that difference is a strength: </span>Challenge biased norms and be inclusive of a variety of people, perspectives, ideas, approaches, and projects.</p>
                <p><span>We adapt: </span>There’s no recipe - be ready and willing to change course and iterate.</p>
                <p><span>We create thoughtfully: </span>Investigate the value and consequences of what, how, and why we make. Set a high bar, technically and ethically.</p>
                <p><span>We invest in each other: </span>Be generous with your time, knowledge, and emotional support. Learn from your teammates and give back through mentorship.</p>
                <p><span>We risk being genuine and vulnerable: </span>Admit weakness, ask questions, be open when asking for and giving help, trust others and yourself.</p>
                <p><span>Code, laugh, love: </span>Don’t take life too seriously.</p>
            </div>
            <div>
                <p>Thank you to our sponsors</p>
                <div>
                   
                </div>
            </div>
        </div>
    )
}