// ===========================================
//  Cute sound effects + background music
//  using Web Audio API — no audio files!
// ===========================================

let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  vol = 0.12,
  delay = 0,
) {
  const c = getCtx()
  const t = c.currentTime + delay
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  gain.gain.setValueAtTime(vol, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration)
  osc.connect(gain).connect(c.destination)
  osc.start(t)
  osc.stop(t + duration)
}

// ─── Background Music ───
// A cute looping melody using pentatonic scale

let musicPlaying = false
let musicInterval: ReturnType<typeof setInterval> | null = null
let musicGainNode: GainNode | null = null

// Cute pentatonic melody notes (C major pentatonic, octave 5-6)
const MELODY_NOTES = [
  523, 587, 659, 784, 880,   // C5 D5 E5 G5 A5
  1047, 880, 784, 659, 587,  // C6 A5 G5 E5 D5
  523, 659, 784, 880, 784,   // C5 E5 G5 A5 G5
  659, 587, 523, 587, 659,   // E5 D5 C5 D5 E5
]

// A simple bass line
const BASS_NOTES = [
  262, 262, 330, 330, // C4 C4 E4 E4
  392, 392, 330, 330, // G4 G4 E4 E4
  262, 262, 392, 392, // C4 C4 G4 G4
  330, 330, 262, 262, // E4 E4 C4 C4
]

function playMelodyNote(freq: number, time: number) {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()

  if (!musicGainNode) {
    musicGainNode = c.createGain()
    musicGainNode.gain.setValueAtTime(0.25, c.currentTime)
    musicGainNode.connect(c.destination)
  }

  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, time)
  gain.gain.setValueAtTime(0.3, time)
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45)
  osc.connect(gain).connect(musicGainNode)
  osc.start(time)
  osc.stop(time + 0.5)
}

function playBassNote(freq: number, time: number) {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()

  if (!musicGainNode) {
    musicGainNode = c.createGain()
    musicGainNode.gain.setValueAtTime(0.25, c.currentTime)
    musicGainNode.connect(c.destination)
  }

  osc.type = 'triangle'
  osc.frequency.setValueAtTime(freq, time)
  gain.gain.setValueAtTime(0.15, time)
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.55)
  osc.connect(gain).connect(musicGainNode)
  osc.start(time)
  osc.stop(time + 0.6)
}

function scheduleLoop() {
  const c = getCtx()
  const now = c.currentTime
  const noteLength = 0.3 // seconds per note
  const bassLength = noteLength * (MELODY_NOTES.length / BASS_NOTES.length)

  // Schedule one full loop of melody
  MELODY_NOTES.forEach((note, i) => {
    playMelodyNote(note, now + i * noteLength)
  })

  // Schedule bass
  BASS_NOTES.forEach((note, i) => {
    playBassNote(note, now + i * bassLength)
  })
}

function startMusic() {
  if (musicPlaying) return
  musicPlaying = true
  musicGainNode = null

  scheduleLoop()
  // Loop every (MELODY_NOTES.length * noteLength) seconds
  const loopDuration = MELODY_NOTES.length * 0.3 * 1000
  musicInterval = setInterval(scheduleLoop, loopDuration)
}

function stopMusic() {
  musicPlaying = false
  if (musicInterval) {
    clearInterval(musicInterval)
    musicInterval = null
  }
  // Fade out
  if (musicGainNode) {
    try {
      const c = getCtx()
      musicGainNode.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.5)
    } catch {
      // ignore
    }
    musicGainNode = null
  }
}

// ─── Brewing sound (bubbly / simmering) ───
let brewInterval: ReturnType<typeof setInterval> | null = null

function startBrewSound() {
  const bubble = () => {
    const freq = 200 + Math.random() * 150
    tone(freq, 0.15, 'sine', 0.04)
    setTimeout(() => tone(freq * 1.2, 0.1, 'sine', 0.03), 80)
  }
  bubble()
  brewInterval = setInterval(bubble, 400 + Math.random() * 300)
}

function stopBrewSound() {
  if (brewInterval) {
    clearInterval(brewInterval)
    brewInterval = null
  }
}

export const sounds = {
  /** Unlock AudioContext (call on first user tap) */
  unlock() {
    getCtx()
  },

  /** Cute pop when collecting a correct ingredient */
  collect() {
    tone(880, 0.1, 'sine', 0.1)
    tone(1100, 0.12, 'sine', 0.1, 0.06)
  },

  /** Buzzy wrong sound */
  wrong() {
    tone(220, 0.12, 'square', 0.06)
    tone(180, 0.18, 'square', 0.05, 0.08)
  },

  /** Chime for round complete */
  roundComplete() {
    tone(523, 0.15, 'sine', 0.1)
    tone(659, 0.15, 'sine', 0.1, 0.12)
    tone(784, 0.25, 'sine', 0.12, 0.24)
  },

  /** Big celebration arpeggio */
  celebrate() {
    const notes = [523, 587, 659, 698, 784, 880, 1047]
    notes.forEach((n, i) => tone(n, 0.22, 'sine', 0.08, i * 0.09))
  },

  /** Soft click */
  click() {
    tone(660, 0.05, 'sine', 0.06)
  },

  /** Button dodge sound (whoosh) */
  dodge() {
    tone(400, 0.08, 'sine', 0.05)
    tone(800, 0.12, 'sine', 0.06, 0.04)
  },

  /** Yes button pressed! */
  yay() {
    const notes = [440, 554, 659, 880, 1100]
    notes.forEach((n, i) => tone(n, 0.3, 'sine', 0.1, i * 0.1))
  },

  /** Start cute background music */
  startMusic,

  /** Stop background music */
  stopMusic,

  /** Start bubbling/brewing sounds */
  startBrewSound,

  /** Stop brewing sounds */
  stopBrewSound,

  /** Magical completion sound */
  brewComplete() {
    const notes = [523, 659, 784, 1047, 1319, 1568]
    notes.forEach((n, i) => tone(n, 0.35, 'sine', 0.07, i * 0.15))
  },
}
