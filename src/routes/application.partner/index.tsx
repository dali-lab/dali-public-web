import { useState } from "react"
import Faq from "./faq"
import WhyDali from "./why"
import Funding from "./funding"
import { Button } from "@/components/ui/button"

export default function PartnerApplication() {
    const [activeTab, setActiveTab] = useState<string>("why")

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
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Partner With DALI</h1>
                <p className="text-base sm:text-lg md:text-xl max-w-2xl">
                    Applications are always open. We review on a termly basis for fall, winter, and spring.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Please let us know if you have any questions at partners@dali.dartmouth.edu
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                    We are currently reviewing projects for Fall 2025.
                </p>
                <a href="https://dali.fillout.com/t/hjQQFxv4U1us">
                    <Button className="mt-5">Apply</Button>
                </a>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-col lg:flex-row w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-[5%] lg:pb-[5%] gap-6">
                {/* Navigation Tabs */}
                <div className="flex flex-row lg:flex-col sm:p-4 gap-2 sm:gap-3">
                    <button 
                        onClick={() => setActiveTab("why")} 
                        className={returnTabStyle("why")}
                    >
                        Why DALI
                    </button>
                    <button 
                        onClick={() => setActiveTab("funding")} 
                        className={returnTabStyle("funding")}
                    >
                        Funding
                    </button>
                    <button 
                        onClick={() => setActiveTab("faq")} 
                        className={returnTabStyle("faq")}
                    >
                        FAQ
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    {activeTab === "why" && <WhyDali />}
                    {activeTab === "funding" && <Funding />}
                    {activeTab === "faq" && <Faq />}
                </div>
            </div>
        </div>
    )
}