import { useEffect } from 'react'
import { CatLove, CatSticker, PawPrint } from './KawaiiCats'
import { sounds } from '../utils/sounds'

const RAIN_EMOJIS = ['💖', '💗', '💕', '🩷', '✨', '🌸', '💝', '❤️']
const RAIN_ITEMS = Array.from({ length: 30 }, (_, i) => ({
  left: `${(i / 30) * 100 + Math.random() * 3}%`,
  animationDuration: `${2.5 + Math.random() * 3}s`,
  animationDelay: `${Math.random() * 3}s`,
  fontSize: `${18 + Math.random() * 18}px`,
  emoji: RAIN_EMOJIS[i % RAIN_EMOJIS.length],
}))

/** Pre-compute sticker cat positions */
const STICKER_CATS = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  left: 5 + (i * 25) % 85,
  bottom: 2 + (i * 7) % 15,
  size: 35 + (i * 8) % 20,
  delay: i * 0.4,
}))

export default function CelebrationScreen() {
  useEffect(() => {
    sounds.celebrate()
  }, [])

  return (
    <div className="celebration-screen">
      <HeartsRain />

      {/* Cute sticker cats along the bottom */}
      <div className="celebration-sticker-cats" aria-hidden="true">
        {STICKER_CATS.map(sc => (
          <CatSticker
            key={sc.id}
            size={sc.size}
            className="sticker-cat-celebrate"
            style={{
              position: 'absolute',
              left: `${sc.left}%`,
              bottom: `${sc.bottom}%`,
              animationDelay: `${sc.delay}s`,
            }}
          />
        ))}
      </div>

      <h1 className="celebration-title">Yay!! 🎉</h1>

      {/* Big kawaii love cat */}
      <div className="celebration-cat-wrapper">
        <CatLove size={120} className="cat-bounce" />
      </div>

      <h2 className="celebration-subtitle">Happy Valentine's Day!</h2>

      <p className="love-message">
        You make every single day brighter and more beautiful.
        Thank you for being the most amazing person in my life.
        <br /><br />
        I love you so much! 💕
      </p>

      {/* Decorative paw prints */}
      <div className="celebration-paws" aria-hidden="true">
        {[0, 1, 2].map(i => (
          <PawPrint
            key={i}
            size={22}
            style={{
              display: 'inline-block',
              margin: '0 8px',
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      <div className="celebration-hearts-row">
        💖 💗 💕 🩷 💖
      </div>
    </div>
  )
}

function HeartsRain() {
  return (
    <div className="hearts-rain" aria-hidden="true">
      {RAIN_ITEMS.map((h, i) => (
        <span
          key={i}
          className="rain-heart"
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
