"use client"
import {useState, useRef, useEffect} from 'react'
import { TiLocationArrow } from "react-icons/ti";
import { TfiAgenda } from "react-icons/tfi";
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import VideoPreview from './VideoPreview';
import Typed from 'typed.js';
import Button from './Button';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const totalVideos = 4;                  // ✅ you want 4
  const LOADING_TARGET = 3;               // ✅ we have 3 actual <video> elements on the page

  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideo, setLoadedVideo] = useState(0);

  // keep your DOM structure but fix refs (no ref reuse)
  const miniVidRef = useRef(null);        // #current-video (the small clickable preview)
  const nextVidRef = useRef(null);        // #next-video (the expanding one)
  const bgVidRef = useRef(null);          // full-bleed background video

  const heroRef = useRef(null);
  const typedRef = useRef(null);

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  // Typed.js
  useEffect(() => {
    typedRef.current = new Typed(heroRef.current, {
      strings: ["R<b>a</b>ma R<b>e</b>alm"],
      startDelay: 150,
      typeSpeed: 70,
      backSpeed: 70,
      backDelay: 70,
      showCursor: false,
      loop: true
    });
    return () => typedRef.current?.destroy();
  }, []);

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  // count loads from exactly the 3 elements we render
  const handleVideoLoad = (name) => {
    setLoadedVideo((v) => v + 1);
  };

  // Force load + autoplay (reliable across browsers)
  useEffect(() => {
    const setup = (ref, name) => {
      const vid = ref.current;
      if (!vid) return;

      vid.muted = true;
      vid.loop = true;
      vid.autoplay = true;
      vid.playsInline = true;   // iOS/Safari
      vid.preload = "auto";

      vid.onloadeddata = () => {
        handleVideoLoad(name);
        vid.play().catch(() => {});
      };

      // If src was set before mount, explicitly trigger
      vid.load();
      vid.play().catch(() => {});
    };

    setup(miniVidRef, "current-video");
    setup(nextVidRef, "next-video");
    setup(bgVidRef, "auto-video");
  }, []);

  // Hide loader once our 3 rendered videos are ready
  useEffect(() => {
    if (loadedVideo >= LOADING_TARGET) setIsLoading(false);
  }, [loadedVideo]);

  // GSAP: expand the #next-video after click (keep your selectors)
  useGSAP(() => {
    if (!hasClicked) return;

    gsap.set('#next-video', { visibility: 'visible' });
    gsap.to('#next-video', {
      transformOrigin: 'center center',
      scale: 1,
      width: '100%',
      height: '100%',
      duration: 1,
      ease: 'power1.inOut',
      onStart: () => nextVidRef.current?.play(),
    });

    gsap.from('#current-video', {
      transformOrigin: 'center center',
      scale: 0,
      duration: 1.5,
      ease: 'power1.inOut',
    });
  }, { dependencies: [currentIndex], revertOnUpdate: true });

  // GSAP: scroll effect on the frame (unchanged)
  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath:'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius:'0px 0px 40% 10%'
    });

    gsap.from('#video-frame', {
      clipPath:'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius:'0px 0px 0px 0px',
      ease:'power1.inOut',
      scrollTrigger:{
        trigger:'#video-frame',
        start:'center center',
        end:'bottom center',
        scrub:true,
      }
    });
  });

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
      {isLoading && (
        <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
          <div className='three-body'>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
          </div>
        </div>
      )}

      <div id="video-frame" className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
        <div>
          {/* Mini clickable preview (kept exactly in your layout) */}
          <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
              >
                <video
                  ref={miniVidRef}
                  id='current-video'
                  src={getVideoSrc(upcomingVideoIndex)}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="auto"
                  className='size-64 origin-center object-cover object-center scale-150'
                />
              </div>
            </VideoPreview>
          </div>

          {/* Expanding “next” video (keep id/class) */}
          <video
            ref={nextVidRef}
            id='next-video'
            src={getVideoSrc(currentIndex)}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
          />

          {/* Full-bleed background video */}
          <video
            ref={bgVidRef}
            // ✅ correct wraparound for 4 videos
            src={getVideoSrc(currentIndex === totalVideos ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className='absolute left-0 top-0 size-full object-cover object-center'
          />
        </div>

        <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
          Lear<b>n</b>ing
        </h1>

        <div className='absolute left-0 top-0 z-40 size-full'>
          <div className='mt-24 px-5 sm:px-10'>
            <h1 ref={heroRef} className='special-font hero-heading font-zentry text-blue-100 min-h-28'></h1>
            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
              Enter the Creative MultiVerse <br /> of Learning
            </p>
            <Button
              id='watch-trailer'
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              rightIcon={<TfiAgenda />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'>
        Lear<b>n</b>ing
      </h1>
    </div>
  );
};

export default Hero;
