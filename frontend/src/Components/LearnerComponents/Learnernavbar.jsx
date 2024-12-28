import { useRef, useState, useEffect} from 'react'
import Button from "../LandingPage_components/Button";
import { GrMultimedia } from "react-icons/gr";
import { useWindowScroll } from 'react-use'
import gsap from 'gsap';
import { Avatar } from '../ui/avatar';
import { LogOut, User, Settings, Library } from 'lucide-react';
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuGroup,
     DropdownMenuItem,
     DropdownMenuLabel,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
   } from "../ui/dropdown-menu";

const navItems = ['About','Contact']
const Learnernavbar = () => {
         const [lastScrollY, setLastScrollY] = useState(0)
         const [isNavVisible, setIsNavVisible] = useState(true)

         const NavContainerRef = useRef(null)

         const {y : currentScrollY }= useWindowScroll();

         
         useEffect(()=>{
             if (currentScrollY === 0) {
                  setIsNavVisible(true)
                  NavContainerRef.current.classList.remove('floating-nav-sec');
             }else if(currentScrollY > lastScrollY){
                  setIsNavVisible(false);
                  NavContainerRef.current.classList.add('floating-nav-sec');
             }else if(currentScrollY < lastScrollY){
                  setIsNavVisible(true);
                  NavContainerRef.current.classList.add('floating-nav-sec');
             }
             setLastScrollY(currentScrollY);
         },[currentScrollY, lastScrollY])
         
         useEffect(() => {
            gsap.to(NavContainerRef.current, {
                 y: isNavVisible ? 0 : -100,
                 opacity: isNavVisible ? 1 : 0,
                 duration: 0.1,    
            })
         },[isNavVisible])

  return (
    <div ref={NavContainerRef} className='fixed z-[100] top-0 w-full h-20 transition-all duration-700'>
       <header className='absolute top-1/2 w-full -translate-y-1/2'>
            <nav className='flex items-center size-full justify-between p-4 rounded-lg'>
                  <div className='flex items-center gap-7'>
                  <video
                    src="/videos/Logo.mp4"
                    type="video/mp4"
                    autoPlay
                    loop
                    muted
                    className="max-w-40"
                    /> 
                  </div>
                  <div className='flex h-full items-center'>
                       <Button
                       id="Course-button"
                       title = "Courses"
                       rightIcon={<GrMultimedia />}
                       containerClass="bg-blue-50 text-black md:flex hidden items-center justify-center gap-1"
                       />
                       <div className='hidden md:block'>
                           {navItems.map((item)=>(
                                    <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn_learner'>
                                        {item}
                                    </a>    
                           ))}
                       </div>
                       <div className='mx-5'>
                       <DropdownMenu className="z-[150]">
                       <DropdownMenuTrigger asChild>
                         <Avatar className='md:flex hidden items-center justify-center gap-1'>
                            <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                            <AvatarFallback>OP</AvatarFallback>
                            </Avatar>
                                     </DropdownMenuTrigger>
                                     <DropdownMenuContent className="w-56" align="end" forceMount>
                                          <DropdownMenuLabel className="font-normal">
                                               <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">John Doe</p>
                                                    <p className="text-xs leading-none text-muted-foreground">
                                                         john.doe@example.com
                                                    </p>
                                               </div>
                                          </DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuGroup>
                                               <DropdownMenuItem>
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>Profile</span>
                                               </DropdownMenuItem>
                                               <DropdownMenuItem>
                                                    <Library className="mr-2 h-4 w-4" />
                                                    <span>My Courses</span>
                                               </DropdownMenuItem>
                                               <DropdownMenuItem>
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    <span>Settings</span>
                                               </DropdownMenuItem>
                                          </DropdownMenuGroup>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem className="text-red-600">
                                               <LogOut className="mr-2 h-4 w-4" />
                                               <span>Log out</span>
                                          </DropdownMenuItem>
                                     </DropdownMenuContent>
                                </DropdownMenu>
                       </div>
                  </div>
            </nav>       
       </header>
    </div>
  )
}

export default Learnernavbar