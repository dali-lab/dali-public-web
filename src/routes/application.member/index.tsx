import { useState } from "react"
import Faq from "./faq"
import Application from "./application"
import Timeline from "./timeline"

export default function MemberApplication() {
    const [activeTab, setActiveTab] = useState<string>("faq")

    function returnTabStyle(tab: string) {
        if (tab === activeTab) {
            return "group inline-flex h-9 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-dali-pink text-white transition-colors hover:bg-dali-pink/90 focus:bg-dali-pink focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-white data-[state=open]:bg-dali-pink/90 data-[state=open]:hover:bg-dali-pink data-[state=open]:focus:bg-dali-pink"
        }
        return "group inline-flex h-9 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-dali-pink/40 hover:text-white focus:bg-dali-pink focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-white data-[state=open]:bg-dali-pink/90 data-[state=open]:hover:bg-dali-pink data-[state=open]:focus:bg-dali-pink"
    }

    return (
        <div className="w-full min-h-screen flex flex-col overflow-hidden">
            {/* Header Section */}
            <div className="flex flex-col w-full px-[8%] py-[8%] sm:px-6 md:px-8 lg:px-[8%] justify-center items-center text-center space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Want to work in DALI?</h1>
                <p className="text-base sm:text-lg md:text-xl max-w-2xl">
                    The 2025 Application is now closed. Check back again next Fall for information about our 2026 Application!
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Email applications@dali.dartmouth.edu with any questions or read our FAQs!
                </p>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-col lg:flex-row w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-[5%] lg:pb-[5%] gap-6">
                {/* Navigation Tabs */}
                <div className="flex flex-row lg:flex-col sm:p-4 gap-2 sm:gap-3">
                    <button 
                        onClick={() => setActiveTab("faq")} 
                        className={returnTabStyle("faq")}
                    >
                        Applications FAQ
                    </button>
                    <button 
                        onClick={() => setActiveTab("application")} 
                        className={returnTabStyle("application")}
                    >
                        Application and Challenges
                    </button>
                    <button 
                        onClick={() => setActiveTab("timeline")} 
                        className={returnTabStyle("timeline")}
                    >
                        Application Timeline
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    {activeTab === "faq" && <Faq />}
                    {activeTab === "application" && <Application />}
                    {activeTab === "timeline" && <Timeline />}
                </div>
            </div>
        </div>
    )
}