import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DayContentProps } from "react-day-picker"
import { format } from "date-fns"

import { cn } from "~/lib/utils"
import { buttonVariants } from "~/components/ui/button"
import { Workshop } from "@/lib/types"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  workshops?: Workshop[]
  setSelectedWorkshop: (workshop: Workshop) => void
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  workshops = [],
  setSelectedWorkshop,
  ...props
}: CalendarProps) {
  const getWorkshopsForDate = (date: Date) => {
    return workshops.filter(workshop => {
      const workshopDate = new Date(workshop.date)
      return format(workshopDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    })
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-base font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-60",
        nav_button_next: "absolute right-60",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-24 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        // styling for the day cell
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-24 w-24 p-0 font-normal aria-selected:opacity-100 flex flex-col items-center justify-start hover:bg-accent/50 hover:text-accent-foreground"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
        DayContent: ({ date, displayMonth, activeModifiers }: DayContentProps) => {
          const dayWorkshops = getWorkshopsForDate(date)
          return (
            <div className="w-full h-full flex flex-col items-center hover:cursor-pointer px-1 py-2 border border-transparent hover:border-accent rounded-md transition-colors">
              <span className="text-sm font-medium mb-2">{date.getDate()}</span>
              <div className="flex-1 w-full overflow-y-auto space-y-1">
                {dayWorkshops.map((workshop, index) => (
                  <button 
                    key={index}
                    className="w-full text-xs px-1.5 py-0.5 bg-dali-pink/20 hover:bg-dali-pink/30 rounded-md text-primary transition-colors duration-200"
                    onClick={() => setSelectedWorkshop(workshop)}>
                    <p className="truncate">{workshop.title}</p>
                  </button>
                ))}
              </div>
            </div>
          )
        }
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
