import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EDITORIAL_ITEMS = [
  { type: 'word', val: 'Más' },
  { type: 'word', val: 'que' },
  { type: 'word', val: 'aplicar' },
  {
    type: 'image',
    src: '/images/down-hero1.png',
    alt: 'Proceso de mezcla analógica',
  },
  { type: 'word', val: 'procesos' },
  { type: 'word', val: 'en' },
  { type: 'word', val: 'serie,' },
  { type: 'word', val: 'abrimos' },
  { type: 'word', val: 'un' },
  { type: 'word', val: 'diálogo' },
  { type: 'word', val: 'con' },
  { type: 'word', val: 'cada' },
  { type: 'word', val: 'proyecto' },
  { type: 'word', val: 'para' },
  { type: 'word', val: 'aportar' },
  { type: 'word', val: 'técnica' },
  {
    type: 'image',
    src: '/images/down-hero2.png',
    alt: 'Monitoreo y visión creativa',
  },
  { type: 'word', val: 'y' },
  { type: 'word', val: 'profesionalismo' },
  { type: 'word', val: 'a' },
  { type: 'word', val: 'la' },
  { type: 'word', val: 'visión' },
  { type: 'word', val: 'creativa.' },
];

export default function TrajectorySection() {
  const sectionRef = useRef(null);
  const wordsContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word & image scroll reveal with blur effect synchronized tightly with scroll
      if (wordsContainerRef.current) {
        const itemEls = wordsContainerRef.current.querySelectorAll('.scrub-item');
        gsap.to(itemEls, {
          color: '#c3c1b6',
          opacity: 1,
          filter: 'blur(0px)',
          stagger: {
            each: 0.035,
            from: 'start',
          },
          ease: 'power1.out',
          scrollTrigger: {
            trigger: wordsContainerRef.current,
            start: 'top 85%',
            end: 'center 45%',
            scrub: 0.6,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="trayectoria"
      ref={sectionRef}
      className="border-b border-transparent bg-[#1b1b1b] py-14 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Scroll-scrubbed editorial paragraph aligned to the right with blurred-to-clear effect and inline badges */}
        <div className="flex justify-end">
          <div className="w-full max-w-4xl text-right">
            <p
              ref={wordsContainerRef}
              className="font-display text-[clamp(1.4rem,2.8vw,2.5rem)] font-normal leading-[1.4] sm:leading-[1.45] tracking-[-0.01em]"
            >
              {EDITORIAL_ITEMS.map((item, idx) => {
                if (item.type === 'image') {
                  return (
                    <img
                      key={`img-${idx}`}
                      src={item.src}
                      alt={item.alt}
                      className="scrub-item inline-block align-middle mx-1.5 sm:mx-2.5 h-[0.9em] sm:h-[0.95em] aspect-[16/10] object-cover select-none pointer-events-none opacity-25 will-change-[filter,opacity]"
                      style={{ filter: 'blur(4px)' }}
                      loading="eager"
                    />
                  );
                }

                return (
                  <span
                    key={`word-${idx}`}
                    className="scrub-item inline-block mr-[0.28em] text-[#4b4b4b] opacity-25 will-change-[filter,opacity] transition-colors"
                    style={{ filter: 'blur(4px)' }}
                  >
                    {item.val}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
