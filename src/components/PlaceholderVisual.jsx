import React from 'react';
import { AudioWaveform, Disc3, Pause, Play, Radio, Sliders, Speaker, Volume2 } from 'lucide-react';

export function CoverArtPlaceholder({
  pattern,
  title,
  artist,
  label,
  catalogNo,
  stage,
  isPlaying,
  onTogglePlay,
}) {
  const isMaster = stage === 'master';
  const isMix = stage === 'mix';

  return (
    <div
      onClick={onTogglePlay}
      className="relative aspect-square w-full h-full overflow-hidden border border-[#4b4b4b] bg-[#141414] select-none group cursor-pointer"
    >
      {/* Real track cover image */}
      <img
        src="/images/joset-still-awake.jpg"
        alt={`Cover art oficial de ${title}`}
        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />

      {/* Subtle overlay film based on stage */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isMaster
            ? 'bg-transparent'
            : isMix
              ? 'bg-[#1b1b1b]/15'
              : 'bg-[#1b1b1b]/40 backdrop-grayscale-[40%]'
        }`}
      />

      {/* Hover play/pause overlay in center */}
      <div
        className={`absolute inset-0 z-25 flex items-center justify-center bg-[#151515]/60 backdrop-blur-[2px] transition-all duration-300 ${
          isPlaying
            ? 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100'
            : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center border-2 border-[#7bf9ba] bg-[#1b1b1b] text-[#7bf9ba] shadow-[0_0_24px_rgba(123,249,186,0.35)] transition-transform duration-300 group-hover:scale-105 hover:bg-[#7bf9ba] hover:text-[#1b1b1b]">
          {isPlaying ? (
            <Pause className="h-7 w-7 sm:h-8 sm:w-8 fill-current" />
          ) : (
            <Play className="h-7 w-7 sm:h-8 sm:w-8 fill-current ml-1" />
          )}
        </div>
      </div>

      {/* Editorial Cover Top Tag */}
      <div className="absolute top-3 right-3 z-30 flex items-center text-[10px] font-semibold tracking-[0.16em] uppercase">
        <span
          className={`px-2 py-1 border ${
            isMaster
              ? 'border-[#7bf9ba] bg-[#7bf9ba] text-[#1b1b1b]'
              : 'border-[#4b4b4b] bg-[#1b1b1b]/90 text-[#7bf9ba]'
          }`}
        >
          {stage.toUpperCase()}
        </span>
      </div>

      {/* Editorial Cover Bottom Lockup */}
      <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-[#4b4b4b]/80 bg-[#1b1b1b]/92 p-3.5">
        <p className="text-[10px] tracking-[0.18em] uppercase text-[#7bf9ba] truncate">{label}</p>
        <p className="font-display text-base font-medium text-[#c3c1b6] truncate mt-0.5">{title}</p>
        <p className="text-xs text-[#c3c1b6]/65 truncate">{artist}</p>
      </div>
    </div>
  );
}

export function StudioPhotoPlaceholder({ visualType, code, index, title }) {
  const icons = {
    'control-room': Speaker,
    'analog-rack': Sliders,
    monitoring: AudioWaveform,
    lounge: Disc3,
  };
  const Icon = icons[visualType] || Radio;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#4b4b4b] bg-[#161616] group">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: 'url("/assets/TEXTURA_PUNTOS_GRIS.png")' }}
      />
      <div className="absolute inset-0 bg-editorial-grid opacity-55" />

      {/* Architectural wireframe representation */}
      <svg viewBox="0 0 640 400" className="relative z-10 h-full w-full">
        {/* Perspective architectural room frame */}
        <rect x="32" y="28" width="576" height="344" fill="none" stroke="#4b4b4b" strokeWidth="1" />
        <line x1="32" y1="28" x2="150" y2="110" stroke="#4b4b4b" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="608" y1="28" x2="490" y2="110" stroke="#4b4b4b" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="32" y1="372" x2="150" y2="290" stroke="#4b4b4b" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="608" y1="372" x2="490" y2="290" stroke="#4b4b4b" strokeWidth="1" strokeDasharray="4 4" />
        <rect x="150" y="110" width="340" height="180" fill="#1b1b1b" fillOpacity="0.6" stroke="#7bf9ba" strokeOpacity="0.45" strokeWidth="1" />

        {visualType === 'control-room' && (
          <g>
            {/* Stereo monitor triangle & acoustic diffusers */}
            <polygon points="320,250 205,155 435,155" fill="none" stroke="#7bf9ba" strokeOpacity="0.7" strokeWidth="1.2" />
            <rect x="180" y="135" width="42" height="58" fill="#1b1b1b" stroke="#c3c1b6" strokeWidth="1" />
            <rect x="418" y="135" width="42" height="58" fill="#1b1b1b" stroke="#c3c1b6" strokeWidth="1" />
            <circle cx="201" cy="172" r="11" fill="none" stroke="#7bf9ba" strokeWidth="1.2" />
            <circle cx="439" cy="172" r="11" fill="none" stroke="#7bf9ba" strokeWidth="1.2" />
            <rect x="240" y="242" width="160" height="32" fill="#222" stroke="#4b4b4b" strokeWidth="1" />
          </g>
        )}

        {visualType === 'analog-rack' && (
          <g>
            {[0, 1, 2, 3].map((slot) => (
              <g key={slot}>
                <rect x="176" y={125 + slot * 38} width="288" height="28" fill="#1b1b1b" stroke="#4b4b4b" strokeWidth="1" />
                {[0, 1, 2, 3, 4, 5].map((knob) => (
                  <circle
                    key={knob}
                    cx={202 + knob * 34}
                    cy={139 + slot * 38}
                    r="6"
                    fill="none"
                    stroke={knob === 2 || knob === 4 ? '#7bf9ba' : '#c3c1b6'}
                    strokeWidth="1.2"
                  />
                ))}
                <rect x="408" y={133 + slot * 38} width="42" height="12" fill="#7bf9ba" fillOpacity="0.22" stroke="#7bf9ba" strokeWidth="0.8" />
              </g>
            ))}
          </g>
        )}

        {visualType === 'monitoring' && (
          <g>
            {/* Acoustic curve grid */}
            <path
              d="M 165 245 Q 210 155 260 205 T 355 185 T 475 170"
              fill="none"
              stroke="#7bf9ba"
              strokeWidth="2"
            />
            <path
              d="M 165 255 Q 230 220 300 225 T 475 215"
              fill="none"
              stroke="#c3c1b6"
              strokeOpacity="0.45"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </g>
        )}

        {visualType === 'lounge' && (
          <g>
            <rect x="185" y="195" width="270" height="58" fill="#1b1b1b" stroke="#c3c1b6" strokeOpacity="0.55" strokeWidth="1" />
            <rect x="210" y="140" width="90" height="35" fill="none" stroke="#7bf9ba" strokeOpacity="0.65" strokeWidth="1" />
            <rect x="340" y="140" width="90" height="35" fill="none" stroke="#4b4b4b" strokeWidth="1" />
          </g>
        )}
      </svg>

      {/* Overlay Studio Photo Slot Badges */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between text-[10px] tracking-[0.16em] uppercase">
        <span className="border border-[#4b4b4b] bg-[#1b1b1b]/90 px-2.5 py-1 text-[#c3c1b6]">
          {code}
        </span>
        <span className="flex items-center gap-1.5 border border-[#7bf9ba]/50 bg-[#1b1b1b]/90 px-2.5 py-1 text-[#7bf9ba]">
          <Icon className="h-3 w-3" />
          REACT PLACEHOLDER · {index}
        </span>
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-[11px] text-[#c3c1b6]/70">
        <span className="bg-[#1b1b1b]/85 px-2.5 py-1 border border-[#4b4b4b]/70 truncate">
          Espacio reservado para fotografía real de {title}
        </span>
      </div>
    </div>
  );
}

export function HeroStudioBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {/* Background hero image with high clarity and subtle contrast */}
      <img
        src="/images/hero-picture.avif"
        alt="Estudio de mezcla y mastering Leo Guerrero"
        className="h-full w-full object-cover object-center opacity-70 brightness-95"
      />
      {/* Soft gradient film ensuring readable text while keeping full depth visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b] via-[#1b1b1b]/35 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#1b1b1b]/50 to-transparent" />
    </div>
  );
}

export function PortraitPlaceholder() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#4b4b4b] bg-[#151515]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url("/assets/TEXTURA_PUNTOS_GRIS.png")' }}
      />
      <div className="absolute inset-0 bg-editorial-grid-dense opacity-45" />

      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between border-b border-[#4b4b4b] pb-3 text-[10px] tracking-[0.18em] uppercase text-[#c3c1b6]/75">
          <span>LEO GUERRERO · PORTRAIT SLOT</span>
          <Volume2 className="h-3.5 w-3.5 text-[#7bf9ba]" />
        </div>

        <div className="my-auto flex flex-col items-center justify-center text-center">
          <div className="relative mb-5 border border-[#7bf9ba]/45 bg-[#1b1b1b]/90 p-6">
            <img
              src="/assets/CUBO_SOUND.png"
              alt="Leo Guerrero Sound Cubo"
              className="h-28 w-28 object-contain"
            />
          </div>
          <p className="font-display text-lg text-[#c3c1b6]">Leo Guerrero</p>
          <p className="text-xs tracking-[0.16em] uppercase text-[#7bf9ba] mt-1">
            Mixing & Mastering Engineer
          </p>
        </div>

        <div className="border-t border-[#4b4b4b] pt-3 flex items-center justify-between text-[10px] tracking-[0.15em] uppercase text-[#c3c1b6]/60">
          <span>LATINOAMÉRICA · GLOBAL</span>
          <span>EST. 2011</span>
        </div>
      </div>
    </div>
  );
}
