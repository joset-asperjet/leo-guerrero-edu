import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import lottie from 'lottie-web/build/player/lottie_light';
import { NAV_ITEMS } from '../data/studioData';

export default function Navbar({ activeView, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const lottieContainerRef = useRef(null);

  const handleNavClick = (viewId) => {
    setMobileOpen(false);
    onNavigate(viewId);
  };

  useEffect(() => {
    let anim = null;
    let timer = null;

    if (lottieContainerRef.current) {
      anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '/looties/lootie-leo-guerrero.json',
      });

      // Play animation every 8 seconds
      timer = setInterval(() => {
        if (anim) {
          anim.goToAndPlay(0, true);
        }
      }, 8000);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (anim) anim.destroy();
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#4b4b4b]/50 bg-[#161616]/95 backdrop-blur-md md:border-transparent md:bg-transparent md:backdrop-blur-none transition-colors">
      <div className="mx-auto flex h-16 sm:h-20 md:h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Brand Logo -> Lottie Animation (no nested redundant border box) */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="group flex items-center text-left focus:outline-none cursor-pointer"
          aria-label="Ir al inicio - Leo Guerrero Sound"
        >
          <div
            ref={lottieContainerRef}
            className="h-10 sm:h-11 md:h-9 w-52 sm:w-60 md:w-56 overflow-hidden flex items-center justify-start pointer-events-none"
          />
        </button>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer ${isActive ? 'text-[#7bf9ba]' : 'text-[#c3c1b6]/80 hover:text-[#c3c1b6]'
                  }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#7bf9ba] transition-all duration-300 ${isActive ? 'w-full' : 'w-0'
                    }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right Desktop Contact Button + Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick('contacto')}
            className={`hidden md:inline-flex items-center gap-2 justify-center border px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer ${
              activeView === 'contacto'
                ? 'border-white bg-white text-[#1b1b1b]'
                : 'border-white bg-transparent text-white hover:bg-white hover:text-[#1b1b1b]'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Contacto</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex md:hidden items-center justify-center border border-[#4b4b4b] p-2 text-[#c3c1b6] hover:border-[#7bf9ba] hover:text-[#7bf9ba] transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Full Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#4b4b4b] bg-[#1b1b1b] px-5 py-6">
          <nav className="flex flex-col divide-y divide-[#4b4b4b]/50">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center justify-between py-4 text-left cursor-pointer"
                >
                  <span
                    className={`font-display text-2xl ${isActive ? 'text-[#7bf9ba]' : 'text-[#c3c1b6]'
                      }`}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs tracking-[0.2em] text-[#4b4b4b]">
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => handleNavClick('contacto')}
            className="mt-6 w-full border border-[#7bf9ba] bg-[#7bf9ba] py-3.5 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#1b1b1b] cursor-pointer"
          >
            Contacto & Reservas
          </button>
        </div>
      )}
    </header>
  );
}
