import Button from './Button'
import AnimatedTitle from './AnimatedTitle'

const ImageClipBoxer =({src, clipClass})=>{
         return(
          <div className={clipClass}>
                 <img src={src} alt='Clip' />
         </div>
         )
}

const Contact = () => {
  return (
    <div id='contact' className='my-20 min-h-96 w-screen px-10'>
       <div className='relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden'>
         <div className='absolute -left-20  top-[-8px] hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96'>
             <ImageClipBoxer
              src="/img/contact-1.webp"
              clipClass="contact-clip-path-1"
             />     
             <ImageClipBoxer
              src="/img/contact-2.webp"
              clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
             />     
         </div>
         <div className='absolute -top-40 right-0 z-10 w-60 sm:top-1/2 md:left-auto lg:top-20 lg:w-80'>
         <ImageClipBoxer
              src="/img/swordman-partial.webp"
              clipClass="absolute md:scale-125"
             />
         <ImageClipBoxer
              src="/img/swordman.webp"
              clipClass="sword-man-clip-path md:scale-125"
             />
         </div>
         <div className='flex flex-col items-center text-center'>
           <p className='font-general text-[20px] uppercase'>Enter Our Rama-Realm</p>
           <AnimatedTitle
            title="Join <b>a</b> World <br />Full of joyfull lear<b>N</b>ing"
            sectionId="#contact"
            containerClass='special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[6rem]'
           />
           <Button title="contact us" containerClass="mt-10 cursor-pointer"/>
         </div>
       </div>
    </div>
  )
}

export default Contact

