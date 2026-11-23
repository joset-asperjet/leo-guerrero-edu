// Pure Web Audio API interactive electronic track synthesizer & 3-stage DSP engine
// Allows instant phase-aligned switching between Pre-Mix, Mixed, and Mastered stages

class TrackAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.stage = 'premix';
    this.preset = 'melodic-techno';
    this.bpm = 126;
    this.step = 0;
    this.nextStepTime = 0;
    this.timerId = null;

    // Audio nodes
    this.sourceBus = null;
    this.mudEq = null;       // +4.5 dB @ 240Hz in premix, -3.5dB clean in mix/master
    this.subEq = null;       // sub weight boost in mix/master
    this.highShelf = null;   // dull in premix, airy sheen in master
    this.compressor = null;  // bus glue in mix & master
    this.shaper = null;      // subtle analog harmonic saturation in master
    this.stereoDelay = null; // subtle spatial width enhancer for mix/master
    this.stereoGain = null;
    this.masterGain = null;
    this.analyser = null;
    this.freqData = null;
    this.timeData = null;
  }

  initContext() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioCtx();

    this.sourceBus = this.ctx.createGain();
    this.mudEq = this.ctx.createBiquadFilter();
    this.mudEq.type = 'peaking';
    this.mudEq.frequency.value = 240;
    this.mudEq.Q.value = 1.2;

    this.subEq = this.ctx.createBiquadFilter();
    this.subEq.type = 'lowshelf';
    this.subEq.frequency.value = 85;

    this.highShelf = this.ctx.createBiquadFilter();
    this.highShelf.type = 'highshelf';
    this.highShelf.frequency.value = 5500;

    this.compressor = this.ctx.createDynamicsCompressor();

    this.shaper = this.ctx.createWaveShaper();
    this.shaper.oversample = '2x';

    // Subtle stereo widening via micro-delay side Haas layer
    this.stereoDelay = this.ctx.createDelay(0.05);
    this.stereoDelay.delayTime.value = 0.011;
    this.stereoGain = this.ctx.createGain();

    this.masterGain = this.ctx.createGain();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 128;
    this.analyser.smoothingTimeConstant = 0.78;
    this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
    this.timeData = new Uint8Array(this.analyser.fftSize);

    // Routing
    this.sourceBus.connect(this.mudEq);
    this.mudEq.connect(this.subEq);
    this.subEq.connect(this.highShelf);
    this.highShelf.connect(this.shaper);
    this.shaper.connect(this.compressor);

    // Parallel width feed
    this.highShelf.connect(this.stereoDelay);
    this.stereoDelay.connect(this.stereoGain);
    this.stereoGain.connect(this.compressor);

    this.compressor.connect(this.masterGain);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    this.applyStageSettings(this.stage);
  }

  makeDistortionCurve(amount) {
    const samples = 1024;
    const curve = new Float32Array(samples);
    const k = amount;
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = k === 0 ? x : ((3 + k) * x * 20 * (Math.PI / 180)) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  applyStageSettings(stage) {
    this.stage = stage;
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const ramp = 0.06;

    if (stage === 'premix') {
      this.mudEq.gain.setTargetAtTime(5.2, now, ramp);
      this.subEq.gain.setTargetAtTime(-2.5, now, ramp);
      this.highShelf.gain.setTargetAtTime(-5.0, now, ramp);
      this.shaper.curve = this.makeDistortionCurve(0);
      this.compressor.threshold.setTargetAtTime(-4, now, ramp);
      this.compressor.ratio.setTargetAtTime(1.2, now, ramp);
      this.compressor.attack.setTargetAtTime(0.03, now, ramp);
      this.compressor.release.setTargetAtTime(0.25, now, ramp);
      this.stereoGain.gain.setTargetAtTime(0.0, now, ramp);
      this.masterGain.gain.setTargetAtTime(0.42, now, ramp);
    } else if (stage === 'mix') {
      this.mudEq.gain.setTargetAtTime(-3.8, now, ramp);
      this.subEq.gain.setTargetAtTime(2.4, now, ramp);
      this.highShelf.gain.setTargetAtTime(1.8, now, ramp);
      this.shaper.curve = this.makeDistortionCurve(2);
      this.compressor.threshold.setTargetAtTime(-16, now, ramp);
      this.compressor.ratio.setTargetAtTime(2.6, now, ramp);
      this.compressor.attack.setTargetAtTime(0.018, now, ramp);
      this.compressor.release.setTargetAtTime(0.14, now, ramp);
      this.stereoGain.gain.setTargetAtTime(0.16, now, ramp);
      this.masterGain.gain.setTargetAtTime(0.68, now, ramp);
    } else if (stage === 'master') {
      this.mudEq.gain.setTargetAtTime(-4.2, now, ramp);
      this.subEq.gain.setTargetAtTime(4.0, now, ramp);
      this.highShelf.gain.setTargetAtTime(3.6, now, ramp);
      this.shaper.curve = this.makeDistortionCurve(6);
      this.compressor.threshold.setTargetAtTime(-23, now, ramp);
      this.compressor.ratio.setTargetAtTime(4.5, now, ramp);
      this.compressor.attack.setTargetAtTime(0.009, now, ramp);
      this.compressor.release.setTargetAtTime(0.09, now, ramp);
      this.stereoGain.gain.setTargetAtTime(0.26, now, ramp);
      this.masterGain.gain.setTargetAtTime(0.92, now, ramp);
    }
  }

  setTrackConfig({ bpm, preset }) {
    this.bpm = bpm || 126;
    this.preset = preset || 'melodic-techno';
  }

  start() {
    this.initContext();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;
    this.nextStepTime = this.ctx.currentTime + 0.05;
    this.scheduler();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  scheduler() {
    if (!this.isPlaying) return;
    const lookahead = 0.1;
    const stepDuration = 60 / this.bpm / 4; // 16th notes

    while (this.nextStepTime < this.ctx.currentTime + lookahead) {
      this.triggerStep(this.step, this.nextStepTime);
      this.nextStepTime += stepDuration;
      this.step = (this.step + 1) % 16;
    }

    this.timerId = setTimeout(() => this.scheduler(), 25);
  }

  triggerStep(step, time) {
    // Pattern differs by electronic subgenre
    const isBreakbeat = this.preset === 'electro-breaks';
    const isAfro = this.preset === 'afro-house';

    // 1. Kick
    const kickSteps = isBreakbeat ? [0, 6, 10] : [0, 4, 8, 12];
    if (kickSteps.includes(step)) {
      this.playKick(time, isBreakbeat ? 50 : 54);
    }

    // 2. Clap / Snare
    const snareSteps = isBreakbeat ? [4, 12] : [4, 12];
    if (snareSteps.includes(step)) {
      this.playClap(time, isBreakbeat);
    }

    // 3. Hi-hat
    if (isAfro) {
      if (step % 2 === 1 || step === 2 || step === 10) {
        this.playHat(time, step % 4 === 2 ? 0.09 : 0.04);
      }
    } else {
      if (step % 2 === 0 || step === 7 || step === 15) {
        this.playHat(time, step % 4 === 2 ? 0.12 : 0.045);
      }
    }

    // 4. Rolling Bassline
    const bassNotes = {
      'melodic-techno': [46.25, 0, 46.25, 46.25, 0, 46.25, 55.0, 0, 46.25, 0, 46.25, 61.74, 0, 55.0, 46.25, 0],
      'tech-house': [55.0, 0, 0, 55.0, 0, 0, 65.41, 0, 55.0, 0, 55.0, 0, 73.42, 0, 65.41, 0],
      'afro-house': [73.42, 0, 0, 73.42, 0, 87.31, 0, 73.42, 0, 0, 98.0, 0, 73.42, 0, 65.41, 0],
      'electro-breaks': [65.41, 0, 65.41, 0, 0, 77.78, 65.41, 0, 98.0, 0, 65.41, 0, 0, 58.27, 65.41, 0],
    };
    const bassFreq = (bassNotes[this.preset] || bassNotes['melodic-techno'])[step];
    if (bassFreq > 0) {
      this.playBass(time, bassFreq, this.preset === 'electro-breaks');
    }

    // 5. Melodic Synth Stab / Arp
    const arpNotes = {
      'melodic-techno': [370.0, 0, 440.0, 0, 554.37, 0, 440.0, 0, 370.0, 0, 493.88, 0, 554.37, 0, 659.25, 0],
      'tech-house': [0, 0, 440.0, 0, 0, 0, 0, 523.25, 0, 0, 440.0, 0, 0, 392.0, 0, 0],
      'afro-house': [293.66, 0, 0, 349.23, 0, 0, 440.0, 0, 523.25, 0, 0, 440.0, 0, 349.23, 0, 0],
      'electro-breaks': [523.25, 0, 622.25, 0, 783.99, 0, 0, 622.25, 523.25, 0, 466.16, 0, 392.0, 0, 523.25, 0],
    };
    const arpFreq = (arpNotes[this.preset] || arpNotes['melodic-techno'])[step];
    if (arpFreq > 0) {
      this.playSynth(time, arpFreq);
    }
  }

  playKick(time, endFreq) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(148, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.055);
    osc.frequency.exponentialRampToValueAtTime(36, time + 0.24);

    gain.gain.setValueAtTime(0.95, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

    osc.connect(gain);
    gain.connect(this.sourceBus);
    osc.start(time);
    osc.stop(time + 0.3);
  }

  playClap(time, punchy) {
    const bufferSize = this.ctx.sampleRate * 0.16;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.04));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = punchy ? 1400 : 1850;
    filter.Q.value = 1.1;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.42, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sourceBus);
    noise.start(time);
  }

  playHat(time, duration) {
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 7200;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.24, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    noise.connect(hp);
    hp.connect(gain);
    gain.connect(this.sourceBus);
    noise.start(time);
  }

  playBass(time, freq, acid) {
    const osc = this.ctx.createOscillator();
    osc.type = acid ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(acid ? 620 : 380, time);
    filter.frequency.exponentialRampToValueAtTime(140, time + 0.14);
    filter.Q.value = acid ? 4.5 : 1.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.42, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sourceBus);
    osc.start(time);
    osc.stop(time + 0.18);
  }

  playSynth(time, freq) {
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq * 1.004, time);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, time);
    filter.frequency.exponentialRampToValueAtTime(420, time + 0.22);
    filter.Q.value = 2.4;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.16, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.24);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.sourceBus);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + 0.26);
    osc2.stop(time + 0.26);
  }

  getAnalyserData() {
    if (!this.analyser || !this.isPlaying) return null;
    this.analyser.getByteFrequencyData(this.freqData);
    return this.freqData;
  }
}

export const trackEngine = new TrackAudioEngine();
