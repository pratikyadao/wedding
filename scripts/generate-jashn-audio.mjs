import fs from 'fs';
import path from 'path';

// Generate 44.1kHz, 16-bit, stereo WAV file of "Jashn-E-Bahaaraa" Flute Theme
const SAMPLE_RATE = 44100;
const BPM = 76;
const BEAT_SEC = 60 / BPM;

// Note frequencies (Hz)
const NOTES = {
  'REST': 0,
  'C3': 130.81, 'G3': 196.00, 'A3': 220.00, 'C4': 261.63, 'D4': 293.66,
  'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99,
  'A5': 880.00
};

// Melody score: [note, durationInBeats]
const MELODY = [
  // Intro drone breath
  ['REST', 2.0],
  // Phrase 1: "Keh-ne ko Jashn-e-ba-haa-raa hai"
  ['E4', 0.8], ['G4', 0.7], ['A4', 1.0],
  ['B4', 0.6], ['C5', 1.0], ['B4', 0.6],
  ['A4', 0.8], ['G4', 0.7], ['A4', 2.0],

  // Pause breath
  ['REST', 0.8],

  // Phrase 2: "Ishq yeh dekh-ke hai-raan hai"
  ['E4', 0.8], ['G4', 0.7], ['A4', 1.0],
  ['B4', 0.6], ['C5', 1.0], ['B4', 0.8],
  ['A4', 0.6], ['G4', 0.8], ['A4', 2.2],

  // Pause breath
  ['REST', 0.8],

  // Phrase 3: Flute interlude flourish
  ['E5', 1.0], ['D5', 0.6], ['C5', 0.8], ['B4', 0.6],
  ['A4', 1.6], ['G4', 0.8], ['A4', 0.8], ['B4', 0.8],
  ['C5', 1.6], ['B4', 0.8], ['A4', 2.5],

  // Outro tail
  ['REST', 1.5]
];

// Calculate total duration
let totalBeats = MELODY.reduce((acc, curr) => acc + curr[1], 0);
let totalSeconds = totalBeats * BEAT_SEC;
let totalSamples = Math.floor(totalSeconds * SAMPLE_RATE);

// Left and Right channel float buffers
const leftBuffer = new Float32Array(totalSamples);
const rightBuffer = new Float32Array(totalSamples);

// 1. Synthesize Drone (Tanpura: C3 + G3 + C4 warm harmonic foundation)
for (let i = 0; i < totalSamples; i++) {
  const t = i / SAMPLE_RATE;
  // Slow undulating phase
  const swell = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.18 * t);
  const drone1 = Math.sin(2 * Math.PI * NOTES['C3'] * t) * 0.08;
  const drone2 = Math.sin(2 * Math.PI * NOTES['G3'] * t) * 0.06;
  const drone3 = Math.sin(2 * Math.PI * NOTES['C4'] * t) * 0.04;
  const droneSound = (drone1 + drone2 + drone3) * swell;

  leftBuffer[i] += droneSound * 0.85;
  rightBuffer[i] += droneSound * 1.15;
}

// 2. Synthesize Flute Melody
let currentSample = 0;

for (const [noteName, beats] of MELODY) {
  const noteDuration = beats * BEAT_SEC;
  const noteSamples = Math.floor(noteDuration * SAMPLE_RATE);
  const freq = NOTES[noteName] || 0;

  if (freq > 0) {
    for (let s = 0; s < noteSamples; s++) {
      const idx = currentSample + s;
      if (idx >= totalSamples) break;

      const t = s / SAMPLE_RATE;
      const progress = s / noteSamples;

      // Bansuri flute envelope: soft breath attack, gentle sustain, smooth release
      let env = 1.0;
      const attackTime = 0.08;
      const releaseTime = 0.14;
      if (t < attackTime) {
        env = Math.sin((t / attackTime) * (Math.PI / 2));
      } else if (progress > 0.85) {
        const relProg = (progress - 0.85) / 0.15;
        env = Math.cos(relProg * (Math.PI / 2));
      }

      // 5Hz gentle vibrato (depth increases slightly during sustain)
      const vibratoDepth = progress > 0.3 ? 0.015 : 0.005;
      const vibrato = 1 + vibratoDepth * Math.sin(2 * Math.PI * 5.2 * t);
      const curFreq = freq * vibrato;

      // Bamboo flute harmonics (pure fundamental, soft 2nd & 3rd, subtle breath noise)
      const phase = 2 * Math.PI * curFreq * t;
      const fundamental = Math.sin(phase);
      const h2 = Math.sin(2 * phase) * 0.22;
      const h3 = Math.sin(3 * phase) * 0.08;
      const h4 = Math.sin(4 * phase) * 0.03;
      // Gentle breath air simulation
      const breathNoise = (Math.random() * 2 - 1) * 0.02 * env;

      const fluteSound = (fundamental + h2 + h3 + h4 + breathNoise) * env * 0.42;

      // Gentle stereo panning (flute centered with warm stereo width)
      leftBuffer[idx] += fluteSound * 0.95;
      rightBuffer[idx] += fluteSound * 1.05;
    }
  }

  currentSample += noteSamples;
}

// 3. Simple Warm Reverb / Delay (creates rich acoustic temple / wedding hall ambiance)
const delaySamples = Math.floor(0.24 * SAMPLE_RATE); // 240ms delay
const feedback = 0.38;

for (let i = delaySamples; i < totalSamples; i++) {
  leftBuffer[i] += rightBuffer[i - delaySamples] * feedback;
  rightBuffer[i] += leftBuffer[i - delaySamples] * feedback * 0.9;
}

// 4. Normalize & Convert to 16-bit PCM WAV
let maxAmp = 0;
for (let i = 0; i < totalSamples; i++) {
  maxAmp = Math.max(maxAmp, Math.abs(leftBuffer[i]), Math.abs(rightBuffer[i]));
}
const gain = maxAmp > 0.95 ? 0.92 / maxAmp : 1.0;

const pcmData = Buffer.alloc(totalSamples * 4); // 2 channels * 2 bytes per sample
for (let i = 0; i < totalSamples; i++) {
  let left = Math.max(-1, Math.min(1, leftBuffer[i] * gain));
  let right = Math.max(-1, Math.min(1, rightBuffer[i] * gain));

  let leftInt = Math.floor(left * 32767);
  let rightInt = Math.floor(right * 32767);

  pcmData.writeInt16LE(leftInt, i * 4);
  pcmData.writeInt16LE(rightInt, i * 4 + 2);
}

// Write standard RIFF WAV header
function createWavHeader(dataLength, sampleRate) {
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataLength, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // SubChunk1Size (16 for PCM)
  header.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
  header.writeUInt16LE(2, 22);  // NumChannels (2 for stereo)
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 4, 28); // ByteRate (sampleRate * 2 channels * 2 bytes)
  header.writeUInt16LE(4, 32);  // BlockAlign
  header.writeUInt16LE(16, 34); // BitsPerSample
  header.write('data', 36);
  header.writeUInt32LE(dataLength, 40);
  return header;
}

const wavHeader = createWavHeader(pcmData.length, SAMPLE_RATE);
const fullWav = Buffer.concat([wavHeader, pcmData]);

const outDir = path.resolve('public/audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outWav = path.join(outDir, 'jashn-e-bahaaraa.wav');
const outMp3 = path.join(outDir, 'jashn-e-bahaaraa.mp3'); // duplicate for max browser compatibility
fs.writeFileSync(outWav, fullWav);
fs.writeFileSync(outMp3, fullWav);

// Also copy to root audio if needed
fs.writeFileSync(path.resolve('public/music.mp3'), fullWav);

console.log(`Generated authentic Jashn-E-Bahaaraa Flute audio: ${totalSeconds.toFixed(1)}s, ${fullWav.length} bytes`);
