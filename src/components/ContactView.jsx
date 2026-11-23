import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight, CheckCircle2, MessageCircle, Send } from 'lucide-react';
import { getWhatsAppUrl } from '../data/studioData';

export default function ContactView({ onNavigate }) {
  const viewRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: 'Mezcla + Mastering',
    genre: 'Melodic Techno / Techno',
    demoUrl: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-stagger', {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, viewRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const buildWhatsappSummary = () => {
    const msg = `Hola Leo, soy ${form.name || '[Productor]'}. Busco servicio de: ${
      form.service
    }. Género: ${form.genre}. ${
      form.demoUrl ? `Demo/Pre-mix: ${form.demoUrl}. ` : ''
    }${form.notes ? `Detalles: ${form.notes}` : ''}`;
    return getWhatsAppUrl(msg);
  };

  return (
    <div ref={viewRef} className="min-h-screen bg-[#1b1b1b] pt-24 pb-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Top Bar */}
        <div className="contact-stagger mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#4b4b4b]/60 pb-5">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c3c1b6]/75 hover:text-[#7bf9ba] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al Inicio
          </button>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7bf9ba]">
            SECCIÓN // CONTACTO & BOOKING
          </span>
        </div>

        <div className="contact-stagger grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Side: Guidelines & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7bf9ba]">
                INICIA TU PROYECTO
              </p>
              <h1 className="mt-3 font-display text-4xl font-medium leading-[1.04] text-[#c3c1b6] sm:text-5xl">
                Cuéntanos sobre tu <span className="text-[#7bf9ba]">próximo lanzamiento.</span>
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#c3c1b6]/75">
                Cuanto mejor entendamos tu intención artística, referencias y fecha estimada de
                lanzamiento, más preciso será el resultado sonoro.
              </p>
            </div>

            <div className="border border-[#4b4b4b] bg-[#151515] p-6 space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7bf9ba]">
                CHECKLIST RÁPIDO PARA ENVIAR STEMS / DEMO
              </p>
              <ul className="space-y-2.5 text-xs text-[#c3c1b6]/80">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-[#7bf9ba]" />
                  <span>WAV o AIFF a 24-bit en la frecuencia nativa del proyecto.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-[#7bf9ba]" />
                  <span>Headroom libre entre -6 dB y -3 dB sin limitador en el master bus.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-[#7bf9ba]" />
                  <span>Incluye 1 o 2 tracks de referencia de club o sello objetivo.</span>
                </li>
              </ul>
            </div>

            <div className="border border-[#7bf9ba]/50 bg-[#141414] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c3c1b6]">
                ¿Prefieres hablar directo ahora?
              </p>
              <a
                href={buildWhatsappSummary()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2.5 border border-[#7bf9ba] bg-[#7bf9ba] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#1b1b1b] hover:bg-transparent hover:text-[#7bf9ba] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Abrir Chat en WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Side: Square Editorial Intake Form */}
          <div className="lg:col-span-7">
            <div className="border border-[#4b4b4b] bg-[#151515] p-6 sm:p-8">
              {submitted ? (
                <div className="py-10 text-center space-y-5">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#7bf9ba]" />
                  <h2 className="font-display text-3xl text-[#c3c1b6]">
                    Solicitud registrada con éxito.
                  </h2>
                  <p className="mx-auto max-w-md text-sm text-[#c3c1b6]/75">
                    Gracias {form.name || 'productor'}. Para agilizar la escucha de tu demo o
                    coordinar el envío de stems inmediatamente, puedes continuar directo en WhatsApp
                    con estos datos precargados.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <a
                      href={buildWhatsappSummary()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-[#7bf9ba] bg-[#7bf9ba] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#1b1b1b]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Enviar Resumen por WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="border border-[#4b4b4b] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#c3c1b6] hover:border-[#c3c1b6] cursor-pointer"
                    >
                      Editar Datos
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c3c1b6]/75 mb-2">
                        Nombre / Proyecto Artístico *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Ej. Matías Valdivia"
                        className="w-full border border-[#4b4b4b] bg-[#1b1b1b] px-4 py-3 text-sm text-[#c3c1b6] placeholder:text-[#4b4b4b] focus:border-[#7bf9ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c3c1b6]/75 mb-2">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="artista@dominio.com"
                        className="w-full border border-[#4b4b4b] bg-[#1b1b1b] px-4 py-3 text-sm text-[#c3c1b6] placeholder:text-[#4b4b4b] focus:border-[#7bf9ba] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c3c1b6]/75 mb-2">
                        Servicio Requerido
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full border border-[#4b4b4b] bg-[#1b1b1b] px-4 py-3 text-sm text-[#c3c1b6] focus:border-[#7bf9ba] focus:outline-none"
                      >
                        <option>Mezcla + Mastering</option>
                        <option>Mastering Estéreo</option>
                        <option>Stem Mastering (Hasta 8 grupos)</option>
                        <option>Mezcla de EP / Álbum</option>
                        <option>LG Talks / Audio Training 1:1</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c3c1b6]/75 mb-2">
                        Subgénero Electrónico / Dance
                      </label>
                      <input
                        type="text"
                        value={form.genre}
                        onChange={(e) => setForm({ ...form, genre: e.target.value })}
                        placeholder="Tech House, Afro House, Melodic Techno..."
                        className="w-full border border-[#4b4b4b] bg-[#1b1b1b] px-4 py-3 text-sm text-[#c3c1b6] placeholder:text-[#4b4b4b] focus:border-[#7bf9ba] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c3c1b6]/75 mb-2">
                      Enlace al Pre-Mix / Demo (SoundCloud privado, Drive, Dropbox)
                    </label>
                    <input
                      type="url"
                      value={form.demoUrl}
                      onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full border border-[#4b4b4b] bg-[#1b1b1b] px-4 py-3 text-sm text-[#c3c1b6] placeholder:text-[#4b4b4b] focus:border-[#7bf9ba] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c3c1b6]/75 mb-2">
                      Visión del Track, Referencias & Sello Objetivo
                    </label>
                    <textarea
                      rows={4}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Cuéntame qué buscas lograr con el sonido, artistas de referencia y si tienes fecha límite para el sello..."
                      className="w-full border border-[#4b4b4b] bg-[#1b1b1b] px-4 py-3 text-sm text-[#c3c1b6] placeholder:text-[#4b4b4b] focus:border-[#7bf9ba] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2.5 border border-[#7bf9ba] bg-[#7bf9ba] px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1b1b1b] hover:bg-transparent hover:text-[#7bf9ba] transition-colors cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    Enviar Brief del Proyecto
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
