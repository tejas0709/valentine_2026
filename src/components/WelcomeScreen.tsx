import { CatChef, CatSticker, PawPrint } from './KawaiiCats'
import { sounds } from '../utils/sounds'

/** Pre-compute decorative elements so they don't change on re-render */
const SPARKLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: 10 + (i * 13) % 80,
  top: 5 + (i * 17) % 60,
  delay: i * 0.4,
  size: 14 + (i * 5) % 10,
}))

const PAWS = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  left: 8 + (i * 19) % 80,
  top: 15 + (i * 23) % 65,
  rotation: (i * 67) % 360,
  delay: i * 0.5,
}))

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const handleStart = () => {
    sounds.unlock()
    sounds.click()
    onStart()
  }

  return (
    <div className="welcome-screen">
      {/* Decorative paw prints background */}
      <div className="welcome-decorations" aria-hidden="true">
        {PAWS.map(p => (
          <PawPrint
            key={p.id}
            size={20}
            className="floating-paw"
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: `${p.top}%`,
              transform: `rotate(${p.rotation}deg)`,
              animationDelay: `${p.delay}s`,
              opacity: 0.3,
            }}
          />
        ))}
        {SPARKLES.map(s => (
          <span
            key={s.id}
            className="welcome-sparkle-float"
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

      {/* Kawaii cat chef */}
      <div className="welcome-cat-container">
        <CatChef size={130} className="welcome-main-cat" />
        <div className="welcome-cat-sparkles">
          <span className="sparkle-orbit s1">✨</span>
          <span className="sparkle-orbit s2">💕</span>
          <span className="sparkle-orbit s3">✨</span>
        </div>
      </div>

      {/* Little sticker cat next to the pot */}
      <div className="welcome-pot-scene">
        <CatSticker size={50} className="welcome-sticker-cat" />
        <span className="welcome-pot">🍲</span>
        <div className="welcome-pot-steam">
          <span className="steam-puff">~</span>
          <span className="steam-puff delay">~</span>
        </div>
      </div>

      <h1 className="welcome-title">Kitty's Love Soup</h1>

      <p className="welcome-subtitle">
        Help kitty collect the right magical ingredients
        to make a very special love soup! 💕
      </p>

      <button className="start-btn" onClick={handleStart}>
        <span>Start Cooking</span>
        <PawPrint size={18} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 6 }} />
      </button>
    </div>
  )
}
