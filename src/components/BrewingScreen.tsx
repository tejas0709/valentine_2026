import { useEffect, useState } from 'react'
import { CatStirring, CatHappy, PawPrint } from './KawaiiCats'
import { sounds } from '../utils/sounds'

interface BrewingScreenProps {
  onComplete: () => void
}

/** The 3 recipe ingredients that were collected */
const RECIPE_INGREDIENTS = [
  { name: 'Berries', emojis: ['🍓', '🍒', '🫐', '🍑', '🍇'], color: '#ff6b8a' },
  { name: 'Sparkles', emojis: ['⭐', '✨', '🌟', '💫', '🔮'], color: '#c77dff' },
  { name: 'Hearts', emojis: ['💖', '💗', '🩷', '💕', '💝'], color: '#ff69b4' },
]

/** Pre-compute steam positions */
const STEAM_PUFFS = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  left: 35 + i * 8,
  delay: i * 0.4,
  size: 14 + (i * 3) % 8,
}))

/** Pre-compute sparkle positions */
const SPARKLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: 15 + (i * 11) % 70,
  top: 10 + (i * 13) % 60,
  delay: i * 0.3,
  size: 12 + (i * 5) % 10,
}))

export default function BrewingScreen({ onComplete }: BrewingScreenProps) {
  const [phase, setPhase] = useState(0)
  // phase 0: cat starts stirring
  // phase 1-3: each ingredient group drops in
  // phase 4: pot bubbles up, magic happens
  // phase 5: complete — show heart soup result

  useEffect(() => {
    sounds.startBrewSound()

    const timers = [
      setTimeout(() => setPhase(1), 1200),   // berries drop in
      setTimeout(() => setPhase(2), 2800),   // sparkles drop in
      setTimeout(() => setPhase(3), 4400),   // hearts drop in
      setTimeout(() => {
        setPhase(4)                           // magic bubbling
        sounds.brewComplete()
      }, 6000),
      setTimeout(() => {
        setPhase(5)                           // done!
        sounds.stopBrewSound()
        sounds.celebrate()
      }, 8000),
      setTimeout(() => {
        onComplete()
      }, 10500),
    ]

    return () => {
      timers.forEach(clearTimeout)
      sounds.stopBrewSound()
    }
  }, [onComplete])

  return (
    <div className="brewing-screen">
      {/* Background sparkles */}
      <div className="brewing-sparkles" aria-hidden="true">
        {phase >= 4 && SPARKLES.map(s => (
          <span
            key={s.id}
            className="brewing-sparkle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay}s`,
              fontSize: `${s.size}px`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* Title */}
      <h2 className="brewing-title">
        {phase < 4 ? 'Brewing the Love Soup...' : phase < 5 ? '✨ Magic happening! ✨' : 'The Love Soup is ready! 💕'}
      </h2>

      {/* Cat stirring the pot */}
      <div className="brewing-scene">
        <div className="brewing-cat-container">
          {phase < 5 ? (
            <CatStirring size={140} className="brewing-cat-stir" />
          ) : (
            <CatHappy size={120} className="brewing-cat-done" />
          )}
        </div>

        {/* The big pot */}
        <div className={`brewing-pot ${phase >= 4 ? 'pot-glowing' : ''} ${phase >= 5 ? 'pot-complete' : ''}`}>
          {/* Steam */}
          <div className="brewing-steam">
            {STEAM_PUFFS.map(s => (
              <span
                key={s.id}
                className={`brewing-steam-puff ${phase >= 4 ? 'steam-intense' : ''}`}
                style={{
                  left: `${s.left}%`,
                  animationDelay: `${s.delay}s`,
                  fontSize: `${s.size}px`,
                }}
              >
                ~
              </span>
            ))}
          </div>

          <span className="brewing-pot-emoji">🍲</span>

          {/* Ingredients dropping in */}
          <div className="brewing-ingredients-drop">
            {RECIPE_INGREDIENTS.map((group, gi) => (
              phase > gi && (
                <div key={gi} className="ingredient-drop-group" style={{ animationDelay: `${gi * 0.1}s` }}>
                  {group.emojis.map((e, ei) => (
                    <span
                      key={ei}
                      className="dropping-ingredient"
                      style={{
                        animationDelay: `${ei * 0.12}s`,
                        color: group.color,
                      }}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              )
            ))}
          </div>

          {/* Glow effect when complete */}
          {phase >= 5 && (
            <div className="pot-heart-burst">
              <span className="burst-heart h1">💖</span>
              <span className="burst-heart h2">💗</span>
              <span className="burst-heart h3">💕</span>
              <span className="burst-heart h4">🩷</span>
              <span className="burst-heart h5">✨</span>
              <span className="burst-heart h6">💝</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress indicators — which ingredients are in */}
      <div className="brewing-progress">
        {RECIPE_INGREDIENTS.map((group, i) => (
          <div
            key={i}
            className={`brew-ingredient-badge ${phase > i ? 'added' : ''}`}
            style={{ borderColor: phase > i ? group.color : 'transparent' }}
          >
            <span className="badge-emoji">{group.emojis[0]}</span>
            <span className="badge-name">{group.name}</span>
            {phase > i && <span className="badge-check">✓</span>}
          </div>
        ))}
      </div>

      {/* Decorative paw prints */}
      <div className="brewing-paws" aria-hidden="true">
        {[0, 1, 2].map(i => (
          <PawPrint
            key={i}
            size={20}
            className="floating-paw"
            style={{
              position: 'absolute',
              left: `${20 + i * 30}%`,
              bottom: `${5 + i * 3}%`,
              animationDelay: `${i * 0.6}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Subtitle text */}
      <p className="brewing-subtitle">
        {phase === 0 && 'Getting the pot ready... 🐱'}
        {phase === 1 && 'Adding sweet berries... 🍓'}
        {phase === 2 && 'Sprinkling in sparkles... ✨'}
        {phase === 3 && 'Pouring in love hearts... 💖'}
        {phase === 4 && 'Stirring with love! 💫'}
        {phase === 5 && 'Made with love, just for you 💕'}
      </p>
    </div>
  )
}
