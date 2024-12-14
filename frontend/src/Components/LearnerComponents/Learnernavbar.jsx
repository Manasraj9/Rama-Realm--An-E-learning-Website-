import { useRef, useState, useEffect} from 'react'
import Button from "../LandingPage_components/Button";
import { GrMultimedia } from "react-icons/gr";
import { useWindowScroll } from 'react-use'
import gsap from 'gsap';
const navItems = ['About','Contact']
const Learnernavbar = () => {
         const [lastScrollY, setLastScrollY] = useState(0)
         const [isNavVisible, setIsNavVisible] = useState(true)

         const NavContainerRef = useRef(null)

         const {y : currentScrollY }= useWindowScroll();

         
         useEffect(()=>{
             if (currentScrollY === 0) {
                  setIsNavVisible(true)
                  NavContainerRef.current.classList.remove('floating-nav');
             }else if(currentScrollY > lastScrollY){
                  setIsNavVisible(false);
                  NavContainerRef.current.classList.add('floating-nav');
             }else if(currentScrollY < lastScrollY){
                  setIsNavVisible(true);
                  NavContainerRef.current.classList.add('floating-nav');
             }
             setLastScrollY(currentScrollY);
         },[currentScrollY, lastScrollY])
         
         useEffect(() => {
            gsap.to(NavContainerRef.current, {
                 y: isNavVisible ? 0 : -100,
                 opacity: isNavVisible ? 1 : 0,
                 duration: 0.2,    
            })
         },[isNavVisible])

  return (
    <div ref={NavContainerRef} className='fixed z-50 top-0 w-full h-20 transition-all duration-700'>
       <header className='absolute top-1/2 w-full -translate-y-1/2'>
            <nav className='flex items-center size-full justify-between p-4 rounded-lg'>
                  <div className='flex items-center gap-7'>
                       <img src="/img/Logo1.svg" alt="logo" className='w-32'/>
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
                  </div>
            </nav>       
       </header>
    </div>
  )
}

export default Learnernavbar