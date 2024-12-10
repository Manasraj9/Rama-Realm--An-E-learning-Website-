import clsx from "clsx";
import { useRef, useState, useEffect} from 'react'
import Button from './Button'
import { GrMultimedia } from "react-icons/gr";
import { useWindowScroll } from 'react-use'
import gsap from 'gsap';
const navItems = ['Features','Story','About','Contact']
const Navbar = () => {
         const [isAudioIndicatorActive, setIsAudioIndicatorActive] = useState(false)
         const [isAudioPlaying, setIsAudioPlaying] = useState(false)
         const [lastScrollY, setLastScrollY] = useState(0)
         const [isNavVisible, setIsNavVisible] = useState(true)

         const NavContainerRef = useRef(null)
         const audioElementRef = useRef(null)

         const {y : currentScrollY }= useWindowScroll();

         const toggleAudioIndicator =() =>{
                  setIsAudioPlaying((prev)=>!prev);
                  setIsAudioIndicatorActive((prev)=>!prev);
         }
         
         useEffect(() => {
                  if(isAudioPlaying){
                           audioElementRef.current.play();
                  }else{
                           audioElementRef.current.pause();

                  }         
           return () => {
           }
         }, [isAudioPlaying])
         
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
    <div ref={NavContainerRef} className='fixed inset-x-0 z-50 top-4 h-16 border-none transition-all duration-700 sm:inset-x-6'>
       <header className='absolute top-1/2 w-full -translate-y-1/2'>
            <nav className='flex items-center size-full justify-between p-4'>
                  <div className='flex items-center gap-7'>
                       <img src="/img/Logo1.svg" alt="logo" className='w-24'/>
                       <Button
                       id="Course-button"
                       title = "Courses"
                       rightIcon={<GrMultimedia />}
                       containerClass="bg-blue-50 text-black md:flex hidden items-center justify-center gap-1"
                       />
                  </div>
                  <div className='flex h-full items-center'>
                       <div className='hidden md:block'>
                           {navItems.map((item)=>(
                                    <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                                        {item}
                                    </a>    
                           ))}
                       </div>
                       <button
                        className='ml-10 flex items-center space-x-[2px]'
                        onClick={toggleAudioIndicator}
                        >
                           <audio
                           ref={audioElementRef}
                           className='hidden'
                           src="/audio/loop.mp3"
                           loop
                           />
                                    {[1 ,2 ,3 ,4 ,5].map((bar)=>(
                                             <div key={bar} className={clsx("indicator-line", {
                                                  active: isAudioIndicatorActive,
                                                })} style={{animationDelay:`${bar * 0.1}s`}} />
                                    ))}
                       </button>
                  </div>
            </nav>       
       </header>
    </div>
  )
}

export default Navbar