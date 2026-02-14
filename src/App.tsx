import { useState, useCallback } from 'react'
import './App.css'
import WelcomeScreen from './components/WelcomeScreen'
import GameScreen from './components/GameScreen'
import BrewingScreen from './components/BrewingScreen'
import ValentineScreen from './components/ValentineScreen'
import CelebrationScreen from './components/CelebrationScreen'

type Screen = 'welcome' | 'game' | 'brewing' | 'valentine' | 'celebration'

const HEART_EMOJIS = ['💕', '💗', '💖', '🩷', '✨', '🌸']
const BG_HEARTS = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 5 + Math.random() * 5) % 100}%`,
  animationDuration: `${8 + Math.random() * 12}s`,
  animationDelay: `${-Math.random() * 10}s`,
  fontSize: `${14 + Math.random() * 14}px`,
  emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
}))

function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [transitioning, setTransitioning] = useState(false)

  const goTo = useCallback((next: Screen) => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen(next)
      setTransitioning(false)
    }, 450)
  }, [])

  return (
    <div className="app-container">
      <FloatingHearts />
      <div className={`screen-wrapper ${transitioning ? 'screen-exit' : 'screen-enter'}`}>
        {screen === 'welcome' && <WelcomeScreen onStart={() => goTo('game')} />}
        {screen === 'game' && <GameScreen onComplete={() => goTo('brewing')} />}
        {screen === 'brewing' && <BrewingScreen onComplete={() => goTo('valentine')} />}
        {screen === 'valentine' && <ValentineScreen onYes={() => goTo('celebration')} />}
        {screen === 'celebration' && <CelebrationScreen />}
      </div>
    </div>
  )
}

function FloatingHearts() {
  return (
    <div className="floating-hearts-bg" aria-hidden="true">
      {BG_HEARTS.map((h, i) => (
        <span
          key={i}
          className="float-heart"
          style={{
            left: h.left,
            animationDuration: h.animationDuration,
            animationDelay: h.animationDelay,
            fontSize: h.fontSize,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}

export default App
