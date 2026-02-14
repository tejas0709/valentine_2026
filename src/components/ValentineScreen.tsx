import { useState } from 'react'
import { CatPleading, CatLove, CatHappy, PawPrint } from './KawaiiCats'
import { sounds } from '../utils/sounds'

const NO_MESSAGES = [
  'No 😅',
  'Are you sure? 🥺',
  "Really?? That's cold 🥶",
  'Pretty please? 🐱',
  "You won't find someone like me! 💁",
  "I'll cry forever 😭",
  "My heart can't take this 💔",
  "Okay I'm literally begging 🧎",
  "PLEASEEE 🙏🙏🙏",
]

export default function ValentineScreen({ onYes }: { onYes: () => void }) {
  const [noCount, setNoCount] = useState(0)
  const [noPos, setNoPos] = useState({ x: 50, y: 80 })

  const dodgeNo = () => {
    sounds.dodge()
    setNoCount(prev => {
      const next = prev + 1
      if (next < NO_MESSAGES.length) {
        setNoPos({
          x: 15 + Math.random() * 60,
          y: 20 + Math.random() * 45,
        })
      }
      return next
    })
  }

  const handleYes = () => {
    sounds.yay()
    onYes()
  }

  // Yes button grows, No button shrinks
  const yesGrow = Math.min(noCount, 9)
  const yesStyle = {
    fontSize: `${24 + yesGrow * 3}px`,
    padding: `${18 + yesGrow * 4}px ${56 + yesGrow * 10}px`,
  }

  const noShrink = Math.max(17 - noCount * 1.2, 10)
  const noStyle = noCount > 0
    ? {
        left: `${noPos.x}%`,
        top: `${noPos.y}%`,
        transform: 'translate(-50%, -50%)',
        fontSize: `${noShrink}px`,
        padding: `${Math.max(10 - noCount, 5)}px ${Math.max(28 - noCount * 2, 14)}px`,
      }
    : undefined

  const noGone = noCount >= NO_MESSAGES.length

  return (
    <div className="valentine-screen">
      {/* Floating paw prints */}
      <div className="valentine-paws" aria-hidden="true">
        {[0, 1, 2, 3].map(i => (
          <PawPrint
            key={i}
            size={18}
            className="floating-paw"
            style={{
              position: 'absolute',
              left: `${15 + i * 22}%`,
              top: `${10 + i * 15}%`,
              animationDelay: `${i * 0.7}s`,
              opacity: 0.25,
            }}
          />
        ))}
      </div>

      <span className="reveal-sparkles">✨ 💕 ✨</span>
      <span className="valentine-pot">🍲</span>

      <h1 className="valentine-question">Himalika, will you be my Valentine? 💕</h1>

      {/* Kawaii cat — changes based on state */}
      <div className="valentine-cat-figure">
        {noGone ? (
          <CatHappy size={100} className="cat-bounce" />
        ) : noCount >= 5 ? (
          <CatPleading size={100} className="cat-wobble" />
        ) : noCount > 0 ? (
          <CatPleading size={90} className="cat-bounce" />
        ) : (
          <CatLove size={90} className="cat-bounce" />
        )}
      </div>

      <button className="yes-btn" onClick={handleYes} style={yesStyle}>
        Yes! 💖
      </button>

      {!noGone ? (
        <button
          className={`no-btn ${noCount > 0 ? 'no-btn-dodging' : ''}`}
          onClick={dodgeNo}
          style={noStyle}
        >
          {NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)]}
        </button>
      ) : (
        <p className="no-gone-text">too late for saying no you fine shyt 😏💅</p>
      )}
    </div>
  )
}
