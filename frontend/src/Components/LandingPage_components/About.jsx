import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
// import { ReactTyped } from 'react-typed'   
import { ScrollTrigger } from 'gsap/all'
import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger)
const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      }
    })

    clipAnimation.to('.mask-clip-path', {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
    })
  })
  return (
    <div id='about' className='min-h-screen w-screen'>
      <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
        <h2 className='font-general text-sm uppercase md:text-[16px]'>Welcome to Rama Realm</h2>
        <AnimatedTitle
          title="A Uni<b>q</b>ue World <br />where lea<b>r</b>ning Comes Alive"
          containerClass="mt-5 !text-black text-center"
        />
        <div className="about-subtext">
          <p>RamaRealm is a place where learning comes alive. We believe in the power of learning and the transformative potential of technology.</p>
          <p>
            Rama Realm Visualized learning using VR to make it interactive as well
          </p>
        </div>
      </div>
      <div className="h-dvh w-screen" id='clip'>
        <div className='mask-clip-path about-image'>
          <img
            src="img/about.webp"
            alt="background"
            className='absolute left-0 top-0 size-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default About