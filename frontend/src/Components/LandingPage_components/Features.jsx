import {useRef,useState} from 'react'
import { FcHeadset } from "react-icons/fc";
import { TiLocationArrow } from "react-icons/ti";
import Button from './Button';
const BentoCardTilt = ({children, className=''}) => {
  const [transfromStyle, setTransfromStyle] = useState('')
  const itemRef = useRef();
  const handleMouseMove = (e) => {
    if(!itemRef.current) return;
    const {left, top, width, height} = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX -left) / width;
    const relativeY = (e.clientY -top) / height;

    const tiltX = (relativeY - 0.5)*10;
    const tiltY = (relativeX - 0.5)*-10;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
    setTransfromStyle(newTransform) 
  }
  const handleMouseLeave = () => {
    setTransfromStyle('')
  }
  return (
    <div className={className}
     ref={itemRef}
     onMouseMove={handleMouseMove}
     onMouseLeave={handleMouseLeave}
     style={{transform: transfromStyle}}
      >
        {children}
    </div>
  )
}

const BentoCard=({src, title, description, isComingSoon})=>{
         return(
                 <div className='relative size-full'>
                  <video
                   src={src}
                   autoPlay
                   muted
                   loop
                   className='absolute size-full left-0 top-0 object-center object-cover'
                  />
                  <div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
                      <div>
                          <h1 className='Bento-title special-font uppercase'>{title}</h1>
                          {description && (
                           <p className='mt-3 max-w-64 text-xs md:text-base'>{description}</p>
                          )} 
                      </div>
                      {isComingSoon && (
                        <Button
                        title={`COMING SOON`}
                        leftIcon={<FcHeadset />}
                        containerClass={'flex-center gap-2'}
                      />
                        )}
                  </div>
                 </div>
         )
}

const Features = () => {
  return (
    <section id='features' className='bg-black pb-52'>
       <div className='container mx-auto px-3 md:px-10'>
         <div className='px-5 py-32'>
            <p className='font-circular-web text-lg text-blue-50'>Intro to Rama Gayana</p>
         <p className='max-w-md font-circular-web text-lg text-blue-50 opacity-50'>
             Get immersed in the Rama Gayana and its vast and rich experience and unlock the power of learning.    
         </p>
         </div>
       <BentoCardTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
         <BentoCard
          src="videos/feature-50.mp4"
          title={<>Ra<b>n</b>dom T<b>i</b>tle</>}
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, iure quia."
          isComingSoon={true}
          />
       </BentoCardTilt>
       <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'>
         <BentoCardTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
             <BentoCard
              src="videos/feature-2.mp4"
              title={<>Ra<b>n</b>dom T<b>i</b>tle 2</>}
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, iure quia."
              isComingSoon={true}
             />
         </BentoCardTilt>
         <BentoCardTilt className='bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
         <BentoCard
              src="videos/feature-3.mp4"
              title={<>Ra<b>n</b>dom T<b>i</b>tle 3</>}
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, iure quia."
              isComingSoon={true}
            />   
         </BentoCardTilt>
         <BentoCardTilt className='bento-tilt_1 row-span-1 me-14 md:col-span-1 md:me-0'>
         <BentoCard
              src="videos/feature-4.mp4"
              title={<>Ra<b>n</b>dom T<b>i</b>tle 4</>}
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, iure quia."
              isComingSoon={true}
            />   
         </BentoCardTilt>
         <BentoCardTilt className='bento-tilt_2'>
            <div className='flex size-full flex-col justify-between bg-violet-300 p-5'>
                  <h1 className='bento-title special-font max-w-64 text-black'>M<b>o</b>re C<b>o</b>ming S<b>o</b>on!</h1>
                  <TiLocationArrow className='m-5 scale-[5] self-end'/>
            </div>
         </BentoCardTilt>
         <BentoCardTilt className='bento-tilt_2'>
             <video
              src='videos/feature-17.mp4'
              loop
              muted
              autoPlay
              className='size-full object-cover object-center'
             />
         </BentoCardTilt>
       </div>
     </div>
    </section>
  )
}

export default Features