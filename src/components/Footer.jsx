import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import lottie from 'lottie-web/build/player/lottie_light';
import { getWhatsAppUrl, NAV_ITEMS } from '../data/studioData';

export default function Footer({ onNavigate }) {
  const lottieContainerRef = useRef(null);

  useEffect(() => {
    let anim = null;
    let timer = null;

    if (lottieContainerRef.current) {
      anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '/looties/second-lootie-leo-guerrero.json',
      });

      // Repeat animation every 8 seconds in sync with brand identity
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
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0a0a0a] text-[#c3c1b6]">
      <div className="mx-auto max-w-[1440px] px-5 pt-14 sm:px-8 lg:px-12 lg:pt-16 pb-0">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="cursor-pointer focus:outline-none flex items-center"
                aria-label="Ir al inicio - Leo Guerrero Sound"
              >
                <div
                  ref={lottieContainerRef}
                  className="h-9 sm:h-10 w-52 sm:w-60 overflow-hidden flex items-center justify-start pointer-events-none"
                />
              </button>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#c3c1b6]/80 font-normal">
                Mezcla y mastering para música electrónica y dance. Conectando sensibilidad artística,
                escucha crítica y criterio técnico desde Latinoamérica hacia pistas y sellos
                discográficos internacionales.
              </p>
            </div>

            <div className="flex items-center gap-4 border-t border-white/10 pt-5">
              <img
                src="/assets/PILAR_SOUND.png"
                alt="Audio Training · Mezcla & Mastering"
                className="h-9 w-auto brightness-0 invert opacity-75"
              />
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Navegación
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className="text-sm font-medium text-[#c3c1b6]/75 hover:text-white underline-offset-4 hover:underline transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contacto')}
                  className="text-sm font-medium text-[#c3c1b6]/75 hover:text-white underline-offset-4 hover:underline transition-colors cursor-pointer"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Direct Channels */}
          <div className="md:col-span-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Contacto Directo
            </p>
            <div className="mt-4 space-y-3 text-sm text-[#c3c1b6]/85">
              <p className="font-medium text-white/90">Sesiones presenciales & remotas Lossless HD</p>
              <p className="text-[#c3c1b6]/60 font-normal">Lun – Vie · 10:00 – 19:00 (GMT-5)</p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#7bf9ba] bg-[#7bf9ba] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#141414] hover:bg-transparent hover:text-[#7bf9ba] transition-all"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp Directo</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#c3c1b6]/60 sm:flex-row sm:items-center sm:justify-between font-normal">
          <p>© {new Date().getFullYear()} Leo Guerrero Sound. Todos los derechos reservados.</p>
          <p className="uppercase tracking-[0.16em]">
            Electronic Music Mixing & Mastering Engineering
          </p>
        </div>

        {/* Medellín Illustration - Compensated for transparent canvas padding so visual artwork aligns with lateral content margins */}
        <div className="mt-12 sm:mt-16 w-full overflow-hidden flex justify-center">
          <img
            src="/images/footer.webp"
            alt="Medellín Metrocable & Cityscape"
            className="w-[155%] max-w-none -mx-[27.5%] h-auto object-contain object-bottom pointer-events-none select-none block"
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  );
}
