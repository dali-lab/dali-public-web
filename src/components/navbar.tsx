import { Link, useLocation } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import logo from '@/assets/logo.png'
import React from 'react'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex w-full justify-between items-center p-3 fixed top-0 bg-sidebar z-50 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.1)]">
      <Link to="/">
        <img src={logo} alt="DALI Logo" className="w-13 h-5"/>
      </Link>
      <NavigationMenu className="flex justify-end">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link 
                to="/education" 
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive("/education") && "text-dali-blue hover:text-dali-blue"
                )}
              >
                Education
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link 
                to="/people" 
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive("/people") && "text-dali-blue hover:text-dali-blue"
                )}
              >
                People
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link 
                to="/projects" 
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive("/projects") && "text-dali-blue hover:text-dali-blue"
                )}
              >
                Projects
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Get Involved</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-[380px] justify-end">
                <ListItem to="/application/partner" title="Partner With Us">
                  Partner with us to design and develop your ideas
                </ListItem>
                <ListItem to="/application/member" title="Join Our Team">
                  Make an impact by working at DALI
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; to: string }
>(({ className, title, children, to, ...props }, ref) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md py-5 px-5 leading-none no-underline outline-none transition-colors hover:bg-sidebar hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            isActive && "text-dali-blue hover:text-dali-blue",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem" 