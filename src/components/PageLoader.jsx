import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web/build/player/lottie_light';
import gsap from 'gsap';

export default function PageLoader({ onFinish }) {
  const containerRef = useRef(null);
  const lottieContainerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll during loader
    document.body.style.overflow = 'hidden';

    let anim = null;
    if (lottieContainerRef.current) {
      anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '/looties/lootie-leo-guerrero.json',
      });
    }

    // Advance progress smoothly over 2.4 seconds
    const startTime = Date.now();
    const duration = 2400;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
      }
    }, 25);

    // Max 3 seconds timer before smooth exit transition
    const timer = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.02,
          duration: 0.45,
          ease: 'power2.inOut',
          onComplete: () => {
            document.body.style.overflow = '';
            if (onFinish) onFinish();
          },
        });
      } else {
        document.body.style.overflow = '';
        if (onFinish) onFinish();
      }
    }, 2550);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      if (anim) anim.destroy();
      document.body.style.overflow = '';
    };
  }, [onFinish]);

  return (
    <aside
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0d0d] select-none pointer-events-auto"
      aria-label="Cargando Leo Guerrero Sound"
    >
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: 'url("/assets/TEXTURA_PUNTOS_GRIS.png")' }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Lottie Logo from Navbar */}
        <div
          ref={lottieContainerRef}
          className="h-14 sm:h-18 md:h-20 w-64 sm:w-80 md:w-96 overflow-hidden flex items-center justify-center"
        />

        {/* Minimal brutalist progress bar */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="h-[2px] w-48 sm:w-60 bg-[#222222] overflow-hidden relative">
            <div
              className="h-full bg-[#7bf9ba] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between w-48 sm:w-60 text-[9px] font-mono tracking-[0.2em] text-[#c3c1b6]/50 uppercase">
            <span>STUDIO // CORE</span>
            <span className="text-[#7bf9ba]">{progress}%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
