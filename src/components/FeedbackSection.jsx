import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEEDBACKS = [
  {
    id: 1,
    quote:
      'Soltar la mezcla de tu track no te hace menos artista. Te hace un artista de alto rendimiento. Aprendé a delegar y dejá que Leo se encargue de lo técnico.',
    author: 'Feedback: Joset DJ/Producer | Discos Eterna',
  },
  {
    id: 2,
    quote:
      'La diferencia en la profundidad del groove y la separación entre kick, bassline y percusiones fue inmediata. El diálogo durante las revisiones nos ayudó a cerrar la firma en Londres.',
    author: 'Feedback: Valeria Montoya (V/M) | Kinetic Groove UK',
  },
  {
    id: 3,
    quote:
      'Llevábamos años luchando para que nuestros tracks compitieran en club sin perder dinámica ni calidez analógica. Trabajar con Leo transformó por completo el sonido del EP.',
    author: 'Feedback: Daro & Solís | Tierra Sonora',
  },
  {
    id: 4,
    quote:
      'Leo no solo limpió el subgrave para que pateara brutal en Funktion-One; entendió la atmósfera oscura del proyecto desde el primer demo. Criterio técnico y musical impecable.',
    author: 'Feedback: Matías Valdivia | Solar Wave',
  },
];

export default function FeedbackSection() {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'waiting' | 'deleting'

  const currentItem = FEEDBACKS[currentIndex];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fb-quote-box', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // QWERTY Typewriter Emulation Engine
  useEffect(() => {
    let timer = null;

    if (phase === 'typing') {
      if (displayedText.length < currentItem.quote.length) {
        // Natural human typing rhythm with subtle organic keystroke variance (18ms to 32ms)
        const delay = Math.floor(Math.random() * 14) + 18;
        timer = setTimeout(() => {
          setDisplayedText(currentItem.quote.slice(0, displayedText.length + 1));
        }, delay);
      } else {
        // Completed typing quote, pause to hold text
        timer = setTimeout(() => {
          setPhase('waiting');
        }, 400);
      }
    } else if (phase === 'waiting') {
      // Hold full quote on screen with blinking cursor for 5.5 seconds to read
      timer = setTimeout(() => {
        setPhase('deleting');
      }, 5500);
    } else if (phase === 'deleting') {
      if (displayedText.length > 0) {
        // Snappy backspacing (deleting 2 characters per 14ms)
        timer = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, Math.max(0, prev.length - 2)));
        }, 14);
      } else {
        // Cleared completely, switch to next feedback and restart typing
        setCurrentIndex((prev) => (prev + 1) % FEEDBACKS.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, phase, currentIndex, currentItem.quote]);

  return (
    <section
      id="feedback"
      ref={sectionRef}
      className="border-b border-[#4b4b4b]/65 bg-[#1b1b1b] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 border-b border-[#4b4b4b]/70 pb-8">
          <div>
            <h2 className="font-display text-3xl font-medium leading-[1.08] text-[#c3c1b6] sm:text-4xl lg:text-5xl">
              <span className="md:block">Resultados reales,</span>
              <span className="md:block">en la pista y el festival</span>
            </h2>
          </div>
        </div>

        {/* Highlighted Dynamic Rotating Testimonial Statement */}
        <div className="fb-quote-box border border-[#4b4b4b] bg-[#161616] p-8 sm:p-12 lg:p-16 relative overflow-hidden min-h-[320px] flex flex-col justify-between">
          <div className="relative z-10 max-w-4xl w-full">
            <div className="border-b border-[#4b4b4b]/50 pb-5 mb-8 flex items-center justify-between">
              <Quote className="h-6 w-6 text-[#7bf9ba]" />
              {/* Subtle slide step counter */}
              <span className="text-[10px] tracking-[0.2em] font-semibold text-[#4b4b4b]">
                0{currentIndex + 1} / 0{FEEDBACKS.length}
              </span>
            </div>

            <div className="min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] flex flex-col justify-start">
              <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl leading-snug font-normal text-[#c3c1b6]">
                “{displayedText}
                <span
                  className="inline-block text-[#7bf9ba] font-mono font-light ml-0.5 select-none animate-qwerty-cursor"
                  aria-hidden="true"
                >
                  |
                </span>
                ”
              </blockquote>
            </div>

            <div className="mt-8 pt-5 border-t border-[#4b4b4b]/50">
              <p
                key={currentItem.id}
                className="text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-[#7bf9ba] transition-opacity duration-300"
              >
                {currentItem.author}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
