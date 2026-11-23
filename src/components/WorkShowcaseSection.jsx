import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  Check,
  ChevronDown,
  Disc3,
  Pause,
  Play,
  Radio,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { WORK_TRACKS } from '../data/studioData';
import { trackEngine } from '../audio/trackEngine';
import { CoverArtPlaceholder } from './PlaceholderVisual';

gsap.registerPlugin(ScrollTrigger);

const STAGE_ORDER = ['premix', 'mix', 'master'];
const BAND_LABELS = ['40Hz', '90Hz', '240Hz', '800Hz', '2.5k', '6k', '12k'];

const SUPPORT_ARTISTS_INFO = {
  'Pavel Petrov': {
    name: 'Pavel',
    subtitle: 'EXE AUDIO',
    avatar: '/images/support-artist/pavel.webp',
  },
  'Cormac': {
    name: 'Cormac',
    subtitle: 'Polari Records',
    avatar: '/images/support-artist/cormac.webp',
  },
  'Joe Lewandowski': {
    name: 'Joe',
    subtitle: 'HÖR Berlin',
    avatar: '/images/support-artist/joe.webp',
  },
  'Lavion': {
    name: 'Lavion',
    subtitle: 'Ritmo Fatale',
    avatar: '/images/support-artist/lavion.webp',
  },
};

export default function WorkShowcaseSection() {
  const sectionRef = useRef(null);
  const stagePanelRef = useRef(null);
  const canvasRef = useRef(null);

  const [selectedTrackIdx, setSelectedTrackIdx] = useState(0);
  const [activeStage, setActiveStage] = useState('master');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMetaInfo, setShowMetaInfo] = useState(false);

  const track = WORK_TRACKS[selectedTrackIdx];
  const stageData = track.stages[activeStage];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      trackEngine.stop();
    };
  }, []);

  // Animate stage transitions smoothly
  useEffect(() => {
    trackEngine.applyStageSettings(activeStage);
    if (!stagePanelRef.current) return;
    gsap.fromTo(
      stagePanelRef.current.querySelectorAll('.stage-animate'),
      { y: 8, opacity: 0.35 },
      { y: 0, opacity: 1, duration: 0.36, stagger: 0.04, ease: 'power2.out' }
    );
  }, [activeStage, selectedTrackIdx]);

  // Sync audio track config when user switches tracks
  useEffect(() => {
    trackEngine.setTrackConfig({ bpm: track.bpm, preset: track.synthPreset });
  }, [track]);

  // Real-time / idle waveform & spectrum canvas renderer
  useEffect(() => {
    let rafId;
    let phase = 0;

    const drawVisualizer = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Subtle background baseline grid
      ctx.strokeStyle = 'rgba(75, 75, 75, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      const barCount = 48;
      const gap = 3;
      const barWidth = Math.max(2, (width - gap * (barCount - 1)) / barCount);

      // ESTADO APAGADO (!isPlaying): línea en reposo sin animación activa
      if (!isPlaying) {
        ctx.fillStyle = '#4b4b4b';
        ctx.globalAlpha = 0.25;
        for (let i = 0; i < barCount; i++) {
          const x = i * (barWidth + gap);
          ctx.fillRect(x, height / 2 - 1, barWidth, 2);
        }
        ctx.globalAlpha = 1;
        return; // Detiene la animación mientras no se reproduzca el track
      }

      // ESTADO ACTIVO (isPlaying): dibujo dinámico de frecuencias del track
      const liveFreq = trackEngine.getAnalyserData();
      const stageBoost = activeStage === 'master' ? 1.0 : activeStage === 'mix' ? 0.76 : 0.48;
      const activeColor = activeStage === 'master' ? '#7bf9ba' : activeStage === 'mix' ? '#c3c1b6' : '#7a7972';

      phase += 0.14;

      for (let i = 0; i < barCount; i++) {
        let norm;
        if (liveFreq) {
          const binIdx = Math.min(liveFreq.length - 1, Math.floor((i / barCount) * liveFreq.length * 0.72));
          norm = liveFreq[binIdx] / 255;
          norm = Math.max(0.08, Math.min(1, norm * (activeStage === 'master' ? 1.15 : activeStage === 'mix' ? 0.92 : 0.68)));
        } else {
          // Contorno de estudio si la fuente aún está cargando
          const wave =
            Math.abs(Math.sin(i * 0.38 + phase) * 0.6 + Math.cos(i * 0.85 - phase * 0.6) * 0.4);
          const env = 0.35 + 0.65 * Math.sin((i / barCount) * Math.PI);
          norm = Math.min(0.95, (0.12 + wave * env) * stageBoost);
        }

        const barHeight = Math.max(4, norm * (height - 12));
        const x = i * (barWidth + gap);
        const y = (height - barHeight) / 2;

        ctx.fillStyle = i % 6 === 0 && activeStage !== 'premix' ? '#7bf9ba' : activeColor;
        ctx.globalAlpha = activeStage === 'premix' ? 0.55 : 0.92;
        ctx.fillRect(x, y, barWidth, barHeight);
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(drawVisualizer);
    };

    drawVisualizer();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [activeStage, isPlaying, selectedTrackIdx]);

  const togglePlay = () => {
    if (isPlaying) {
      trackEngine.stop();
      setIsPlaying(false);
    } else {
      trackEngine.setTrackConfig({ bpm: track.bpm, preset: track.synthPreset });
      trackEngine.applyStageSettings(activeStage);
      trackEngine.start();
      setIsPlaying(true);
    }
  };

  const handleTrackSelect = (idx) => {
    setSelectedTrackIdx(idx);
    setIsPlaying(false);
    trackEngine.stop();
    const nextTrack = WORK_TRACKS[idx];
    trackEngine.setTrackConfig({ bpm: nextTrack.bpm, preset: nextTrack.synthPreset });
  };

  return (
    <section
      id="su-trabajo"
      ref={sectionRef}
      className="border-b border-[#4b4b4b]/65 bg-[#1b1b1b] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 pt-4 lg:pt-12">
          {/* LEFT COLUMN: Editorial Text */}
          <div className="work-reveal lg:col-span-5 flex flex-col justify-start gap-6 lg:pt-0">
            <div>
              <h2 className="font-display text-3xl font-medium leading-[1.08] text-[#c3c1b6] sm:text-4xl lg:text-[2.75rem]">
                Escucha cómo evoluciona un track desde la mezcla con stems hasta el mastering final
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-[#c3c1b6]/80 sm:text-base">
                La confianza que hemos construido en la escena nos ha permitido meter mano en procesos integrales como co-producing e incluso ghost producing (bajo un estricto regimen de confidencialidad)
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Pre-Mix / Mix / Master Engineering Module */}
          <div className="work-reveal lg:col-span-7">
            <div
              ref={stagePanelRef}
              className="relative border border-[#4b4b4b] bg-[#151515]"
            >
              {/* Desktop Cursive callout floating above container, pointing down to button 02 (Mezclado) */}
              <div className="pointer-events-none hidden lg:flex items-center gap-1.5 absolute -top-10 left-1/2 -translate-x-[65%] select-none z-20">
                <span
                  style={{ fontFamily: "'Caveat', cursive" }}
                  className="text-2xl font-normal text-[#c3c1b6] tracking-wide -rotate-2 inline-block"
                >
                  Escucha el proceso
                </span>
                <svg
                  viewBox="0 0 46 36"
                  fill="none"
                  stroke="currentColor"
                  className="h-8 w-10 text-[#7bf9ba] stroke-[1.6] translate-y-2.5 overflow-visible"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Organic curved stem animated with drawing effect */}
                  <path
                    d="M4 6c16-1 28 8 30 22"
                    pathLength="100"
                    className="animate-draw-stem"
                  />
                  {/* Arrowhead animated to click into place right after stem */}
                  <path
                    d="M27 22l7 7 5-8"
                    pathLength="100"
                    className="animate-draw-head"
                  />
                </svg>
              </div>
              {/* TOP CONSOLE HEADER + INTUITIVE 3-STAGE TOGGLE */}
              <div className="border-b border-[#4b4b4b] bg-[#181818] p-4 sm:p-5">
                {/* 3-State Toggle Switch */}
                <div
                  className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                  role="tablist"
                  aria-label="Comparar etapa del track"
                >
                  {STAGE_ORDER.map((stageKey, sIdx) => {
                    const st = track.stages[stageKey];
                    const selected = activeStage === stageKey;
                    return (
                      <button
                        key={stageKey}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActiveStage(stageKey)}
                        className={`flex items-center border px-4 py-3 text-left transition-all cursor-pointer ${selected
                          ? 'border-[#7bf9ba] bg-[#7bf9ba] text-[#1b1b1b]'
                          : 'border-[#4b4b4b] bg-[#1b1b1b] text-[#c3c1b6] hover:border-[#c3c1b6]'
                          }`}
                      >
                        <div>
                          <span
                            className={`block text-[10px] font-bold uppercase tracking-[0.18em] ${selected ? 'text-[#1b1b1b]/75' : 'text-[#7bf9ba]'
                              }`}
                          >
                            0{sIdx + 1} · {st.label}
                          </span>
                          <span className="font-display text-sm font-bold">
                            {st.shortLabel}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* MAIN CONSOLE BODY: Cover Art + Waveform Player */}
              <div className="flex flex-col sm:flex-row items-stretch gap-5 sm:gap-6 border-b border-[#4b4b4b] p-5 sm:p-6">
                {/* Cover Art del Track (proporcional y de igual altura vertical que el espectrograma) */}
                <div className="w-full sm:w-auto shrink-0 flex justify-center">
                  <div className="w-full max-w-[280px] sm:max-w-none h-64 w-64 sm:h-60 sm:w-60 lg:h-64 lg:w-64 aspect-square">
                    <CoverArtPlaceholder
                      pattern={track.coverPattern}
                      title={track.title}
                      artist={track.artist}
                      label={track.signedLabel}
                      catalogNo={track.catalogNo}
                      stage={activeStage}
                      isPlaying={isPlaying}
                      onTogglePlay={togglePlay}
                    />
                  </div>
                </div>

                {/* Live Waveform / Spectrum Visualization */}
                <div className="flex-1 w-full min-w-0 h-44 sm:h-60 lg:h-64">
                  <div className="relative h-full w-full border border-[#4b4b4b] bg-[#141414] p-2 sm:p-3 overflow-hidden">
                    {/* Status corner badge */}
                    <div className="absolute top-2.5 right-3 z-10 flex items-center gap-2 select-none">
                      <span
                        className={`inline-block h-1.5 w-1.5 transition-colors ${
                          isPlaying
                            ? 'bg-[#7bf9ba] shadow-[0_0_8px_#7bf9ba]'
                            : 'bg-[#4b4b4b]'
                        }`}
                      />
                      <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-[#c3c1b6]/60">
                        {isPlaying ? 'LIVE OUTPUT' : 'STANDBY'}
                      </span>
                    </div>

                    <canvas ref={canvasRef} className="h-full w-full block" />
                  </div>
                </div>
              </div>

              {/* DJ SUPPORT BAR (BELOW TRACK, ABOVE META INFO) */}
              <div className="border-b border-[#4b4b4b] bg-[#151515] p-3.5 sm:px-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#7bf9ba] font-bold shrink-0 mr-1">
                  DJ Support:
                </span>
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  {track.supportedBy.map((artistKey) => {
                    const info = SUPPORT_ARTISTS_INFO[artistKey] || {
                      name: artistKey,
                      subtitle: '',
                      avatar: null,
                    };
                    return (
                      <div
                        key={artistKey}
                        className="inline-flex items-center gap-2.5 border border-[#4b4b4b]/70 bg-[#1b1b1b] px-2.5 py-1.5 text-xs text-[#c3c1b6] transition-colors hover:border-[#7bf9ba]/70"
                      >
                        {info.avatar && (
                          <img
                            src={info.avatar}
                            alt={info.name}
                            className="h-6 w-6 sm:h-7 sm:w-7 object-cover object-center shrink-0 block"
                            loading="lazy"
                          />
                        )}
                        <div className="flex flex-col text-left leading-none">
                          <span className="text-[11px] sm:text-xs font-semibold text-[#c3c1b6]">
                            {info.name}
                          </span>
                          {info.subtitle && (
                            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-[#c3c1b6]/70 font-medium mt-1">
                              {info.subtitle}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BOTTOM BAR: ONLY FOR META INFO BUTTON */}
              <div className="bg-[#161616] p-4 sm:px-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowMetaInfo(!showMetaInfo)}
                  className="inline-flex items-center gap-3 border border-[#4b4b4b] bg-[#1b1b1b] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#c3c1b6] transition-all hover:border-[#7bf9ba] hover:text-[#7bf9ba] cursor-pointer"
                >
                  <span>Meta info</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#7bf9ba] transition-transform duration-300 ${
                      showMetaInfo ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c3c1b6]/50 hidden sm:inline">
                  Ficha Técnica & Label Specs
                </span>
              </div>

              {/* COLLAPSIBLE META INFO (META TAGS, LABEL & DJ SUPPORT) */}
              {showMetaInfo && (
                <div className="border-t border-[#4b4b4b] transition-all duration-300">
                  {/* META TAGS ROW */}
                  <div className="stage-animate border-b border-[#4b4b4b] bg-[#161616] p-5 sm:px-6">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7bf9ba]">
                      META TAGS
                    </p>
                    <div className="grid grid-cols-2 gap-px bg-[#4b4b4b] border border-[#4b4b4b] sm:grid-cols-5">
                      <div className="bg-[#1b1b1b] p-3">
                        <span className="block text-[10px] uppercase tracking-[0.14em] text-[#c3c1b6]/50">
                          Género
                        </span>
                        <span className="mt-1 block text-xs font-semibold text-[#c3c1b6]">
                          {track.genre}
                        </span>
                      </div>
                      <div className="bg-[#1b1b1b] p-3">
                        <span className="block text-[10px] uppercase tracking-[0.14em] text-[#c3c1b6]/50">
                          BPM / Key
                        </span>
                        <span className="mt-1 block text-xs font-semibold text-[#c3c1b6]">
                          {track.bpm} BPM · {track.musicalKey}
                        </span>
                      </div>
                      <div className="bg-[#1b1b1b] p-3">
                        <span className="block text-[10px] uppercase tracking-[0.14em] text-[#c3c1b6]/50">
                          Formato Master
                        </span>
                        <span className="mt-1 block text-xs font-semibold text-[#c3c1b6]">
                          {track.format}
                        </span>
                      </div>
                      <div className="bg-[#1b1b1b] p-3">
                        <span className="block text-[10px] uppercase tracking-[0.14em] text-[#c3c1b6]/50">
                          Duración
                        </span>
                        <span className="mt-1 block text-xs font-semibold text-[#c3c1b6]">
                          {track.duration}
                        </span>
                      </div>
                      <div className="bg-[#1b1b1b] p-3">
                        <span className="block text-[10px] uppercase tracking-[0.14em] text-[#c3c1b6]/50">
                          Año
                        </span>
                        <span className="mt-1 block text-xs font-semibold text-[#c3c1b6]">
                          {track.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* LABEL SIGNED */}
                  <div className="p-5 sm:px-6 bg-[#151515] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c3c1b6]/60">
                        Label / Sello Discográfico
                      </p>
                      <p className="mt-1 font-display text-xl font-medium text-[#7bf9ba]">
                        {track.signedLabel}
                      </p>
                    </div>
                    <p className="text-xs text-[#c3c1b6]/60 font-medium">
                      Lanzamiento oficial ({track.year})
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
