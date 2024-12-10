import {useRef, useEffect} from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);
const AnimatedTitle = ({title, containerClass}) => {

         const constainerRef = useRef(null);

         useEffect(() => {
            const context = gsap.context(() => {
               const titleAnimation = gsap.timeline({
                  scrollTrigger: {
                     trigger: constainerRef.current,
                     start: '100 bottom',
                     end: 'center bottom',
                     toggleActions: 'play none none reverse',
                  }
               })
                titleAnimation.to(('.animated-word'),{
                  opacity: 1,
                  transform: 'translate3d(0px, 0px, 0px) rotateY(0deg) rotateX(0deg)',
                  ease: 'power2.inout',
                  stagger: 0.02,

                })  
            }, constainerRef)

            return () => context.revert();      
         }, [])

  return (
         <div ref={constainerRef} className={`animated-title ${containerClass}`}>
         {title.split('<br />').map((line, index)=>(
              <div key={index} className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'>
                  {line.split(' ').map((word,i)=>(
                           <span key={i} className='animated-word' dangerouslySetInnerHTML={{ __html: word }} />
                  ))}
              </div>    
         ))}
       </div>
  )
}

export default AnimatedTitle