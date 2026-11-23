import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight, MessageCircle, Mic2 } from 'lucide-react';
import { getWhatsAppUrl, LG_TALKS_DATA } from '../data/studioData';

const CATEGORIES = ['Todos', 'Mezcla', 'Mastering', 'Audio Training'];

export default function TalksView({ onNavigate }) {
  const viewRef = useRef(null);
  const [filter, setFilter] = useState('Todos');

  const filteredTalks =
    filter === 'Todos'
      ? LG_TALKS_DATA
      : LG_TALKS_DATA.filter((item) => item.category === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.talks-stagger', {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, viewRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={viewRef} className="min-h-screen bg-[#1b1b1b] pt-24 pb-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Top Bar */}
        <div className="talks-stagger mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#4b4b4b]/60 pb-5">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c3c1b6]/75 hover:text-[#7bf9ba] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al Inicio
          </button>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7bf9ba]">
            SECCIÓN // LG TALKS & AUDIO TRAINING
          </span>
        </div>

        {/* Header + Pilar Brand Lockup */}
        <div className="talks-stagger grid grid-cols-1 gap-8 border-b border-[#4b4b4b] pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 border border-[#7bf9ba]/50 bg-[#7bf9ba]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7bf9ba]">
              <Mic2 className="h-3.5 w-3.5" />
              FORMACIÓN & CRITERIO CRÍTICO
            </div>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.04] text-[#c3c1b6] sm:text-6xl">
              LG Talks: compartiendo{' '}
              <span className="text-[#7bf9ba]">criterio sonoro</span> sin secretos de caja negra.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#c3c1b6]/75 sm:text-base">
              Charlas técnicas, deconstrucciones de mezcla y talleres de Audio Training pensados para
              productores de música electrónica que desean elevar su escucha crítica antes y durante el
              lanzamiento.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="border border-[#4b4b4b] bg-[#151515] p-5">
              <img
                src="/assets/PILAR_SOUND.png"
                alt="Leo Guerrero Sound Audio Training"
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="talks-stagger mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer ${
                  active
                    ? 'border-[#7bf9ba] bg-[#7bf9ba] text-[#1b1b1b]'
                    : 'border-[#4b4b4b] bg-[#151515] text-[#c3c1b6] hover:border-[#c3c1b6]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Talks Grid */}
        <div className="talks-stagger mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredTalks.map((talk) => (
            <article
              key={talk.id}
              className="flex flex-col justify-between border border-[#4b4b4b] bg-[#151515] p-6 sm:p-8 hover:border-[#7bf9ba]/70 transition-colors"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#4b4b4b]/60 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7bf9ba]">
                    {talk.category} · {talk.date}
                  </span>
                  <span className="border border-[#4b4b4b] bg-[#1b1b1b] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#c3c1b6]/75">
                    {talk.status}
                  </span>
                </div>

                <h2 className="mt-5 font-display text-2xl font-medium leading-snug text-[#c3c1b6]">
                  {talk.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#c3c1b6]/75">
                  {talk.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {talk.topics.map((tp) => (
                    <span
                      key={tp}
                      className="border border-[#4b4b4b] bg-[#1b1b1b] px-2.5 py-1 text-[11px] text-[#c3c1b6]/80"
                    >
                      {tp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-[#4b4b4b]/60 pt-5 flex items-center justify-between">
                <a
                  href={getWhatsAppUrl(`Hola Leo, me interesa participar o acceder a LG Talks: "${talk.title}".`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#7bf9ba] hover:text-[#c3c1b6] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Solicitar acceso / mentoría
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
