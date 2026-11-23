import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HERO_DATA } from '../data/studioData';
import { HeroStudioBackdrop } from './PlaceholderVisual';

export default function HeroSection() {
  const heroRef = useRef(null);
  const letterRefs = useRef([]);
  letterRefs.current = [];

  const addLetterRef = (el) => {
    if (el && !letterRefs.current.includes(el)) {
      letterRefs.current.push(el);
    }
  };

  const text = 'Made in Medellín';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-handwriting-wrap', {
        opacity: 0,
        y: 15,
        duration: 0.6,
      })
        .from(
          '.hero-title-text',
          {
            y: 44,
            opacity: 0,
            duration: 0.85,
          },
          '-=0.3'
        )
        .from(
          '.hero-subcopy',
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.35'
        );

      // Clean cursive handwriting reveal without any cursor/indicator bar
      const letters = letterRefs.current;

      if (letters.length > 0) {
        const loopTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 3.2, // pauses, then loops every 5s smoothly
        });

        loopTl
          .set(letters, {
            opacity: 0,
            scaleY: 0.3,
            scaleX: 0.8,
            transformOrigin: 'bottom left',
            filter: 'blur(2px)',
          })
          .to(letters, {
            opacity: 1,
            scaleY: 1,
            scaleX: 1,
            filter: 'blur(0px)',
            duration: 0.12,
            stagger: {
              each: 0.1,
              ease: 'power1.inOut',
            },
            ease: 'power2.out',
          });
      }

      // GSAP cleanup
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100dvh] w-full flex-col justify-end overflow-hidden bg-[#1b1b1b] pt-16 border-b border-transparent"
    >
      <HeroStudioBackdrop />

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="max-w-5xl">
          {/* Animated handwritten cursive badge with Colombian flag */}
          <div className="hero-handwriting-wrap mb-4 sm:mb-5 flex items-center gap-3 select-none">
            <div className="relative inline-flex items-center">
              {/* Natural cursive handwritten letters */}
              <span
                style={{ fontFamily: "'Caveat', cursive" }}
                className="inline-flex text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#7bf9ba] tracking-wide"
              >
                {text.split('').map((char, index) => (
                  <span
                    key={index}
                    ref={addLetterRef}
                    className="inline-block will-change-transform"
                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </div>

            {/* Square editorial Colombia flag */}
            <div
              className="inline-flex flex-col h-4 w-6 sm:h-5 sm:w-7 border border-[#4b4b4b] overflow-hidden shadow-sm shrink-0"
              title="Colombia"
              aria-label="Bandera de Colombia"
            >
              <div className="h-[50%] w-full bg-[#FCD116]" />
              <div className="h-[25%] w-full bg-[#003893]" />
              <div className="h-[25%] w-full bg-[#CE1126]" />
            </div>
          </div>

          <h1
            style={{ fontFamily: "'Neue Machina', 'Neue Haas Display', 'Open Sans', sans-serif" }}
            className="text-[clamp(2.4rem,6.2vw,5.5rem)] font-extrabold tracking-[-0.03em] leading-[1.02] text-[#ffffff]"
          >
            <span className="hero-title-text block">
              {HERO_DATA.headline}
            </span>
          </h1>

          <div className="mt-8 max-w-2xl">
            <p className="hero-subcopy text-base leading-relaxed text-[#c3c1b6]/80 sm:text-lg">
              {HERO_DATA.subcopy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
