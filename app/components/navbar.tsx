import React from "react"
import { cn } from "~/lib/utils"
import { NavbarProps, ListItemProps } from "~/lib/types"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
  } from "~/components/ui/navigation-menu"
import { Link } from "@remix-run/react"
import logo from "../../public/logo.png"

export default function Navbar({ className }: NavbarProps) {
  return (
    <div className="flex w-full justify-between items-center p-4">
        <img src={logo} alt="DALI Logo" className="w-17 h-7"/>
        <NavigationMenu className="flex justify-end">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to="/about">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/people">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>People</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/projects">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Projects</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Get Involved</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex flex-col w-[380px] justify-end">
                            <Link to="/application/partner">
                                <ListItem title="Partner With Us">
                                    <p>Partner with us to design and develop your ideas</p>
                                </ListItem>
                            </Link>
                            <Link to="/application/member">
                                <ListItem title="Join Our Team">
                                    Make an impact by working at DALI
                                </ListItem>
                            </Link>
                            <Link to="/education">
                                <ListItem title="Workshops and Miniseries">
                                    Join us for workshops and miniseries
                                </ListItem>
                            </Link>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/myaccount">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>My Account</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  ListItemProps & React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md py-5 px-5 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"