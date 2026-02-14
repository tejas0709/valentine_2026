import { useState, useCallback, useRef, useEffect } from 'react'
import { CatChef, CatHappy, CatShocked, CatStirring } from './KawaiiCats'
import { sounds } from '../utils/sounds'


interface GameScreenProps {
  onComplete: () => void
}

/** Each round's recipe: collect every unique target, avoid distractors */
const RECIPES = [
  {
    name: 'Sweet Berry Base',
    color: '#ff6b8a',
    targets: ['🍓', '🍒', '🫐', '🍑', '🍇'],
    bad: ['🧅', '🌶️', '🧄', '🥦', '🍆'],
    catSays: 'Pick the yummy fruits!',
    doneSays: 'Purrfect berries! 🍓',
  },
  {
    name: 'Sparkle Potion',
    color: '#c77dff',
    targets: ['⭐', '✨', '🌟', '💫', '🔮'],
    bad: ['🌧️', '🪨', '🍂', '💨', '🌫️'],
    catSays: 'Grab the sparkly things!',
    doneSays: 'So sparkly! ✨',
  },
  {
    name: 'Hearts & Love',
    color: '#ff69b4',
    targets: ['💖', '💗', '🩷', '💕', '💝'],
    bad: ['💔', '🖤', '💜', '💙', '💚'],
    catSays: 'Only pink hearts, please!',
    doneSays: 'The love soup is ready! 💕',
  },
]

type Phase = 'intro' | 'playing' | 'roundComplete' | 'allComplete'

/** Shuffle an array */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const CORRECT_MSGS = ['Yummy!', 'Good pick!', 'Purrfect!', 'Meow yeah!', 'Nice one!', 'Into the pot! 🍲']
const WRONG_MSGS = ['Eww, not that!', 'Yucky! 🙀', 'No no no!', "That's not right!", 'Blegh! 😿', 'Kitty says NOPE 🙅']

export default function GameScreen({ onComplete }: GameScreenProps) {
  const [round, setRound] = useState(0)
  const [phase, setPhase] = useState<Phase>('intro')
  const [collected, setCollected] = useState<Set<string>>(new Set())
  const [wrongItems, setWrongItems] = useState<Set<string>>(new Set())
  const [boardItems, setBoardItems] = useState<string[]>([])
  const [bubbleText, setBubbleText] = useState('')
  const [showBubble, setShowBubble] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [catMood, setCatMood] = useState<'chef' | 'happy' | 'shocked'>('chef')
  const [popItem, setPopItem] = useState<string | null>(null)
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const introTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const recipe = RECIPES[round]

  /** Start background music when game mounts */
  useEffect(() => {
    sounds.startMusic()
    return () => { sounds.stopMusic() }
  }, [])

  /** Set up the board for a round — all targets + all distractors, shuffled */
  const setupBoard = useCallback((roundIdx: number) => {
    const r = RECIPES[roundIdx]
    const allItems = shuffle([...r.targets, ...r.bad])
    setBoardItems(allItems)
    setCollected(new Set())
    setWrongItems(new Set())
    setCatMood('chef')
    setBubbleText(r.catSays)
    setShowBubble(true)
  }, [])

  /** Start playing from intro */
  const startPlaying = useCallback(() => {
    setupBoard(round)
    setPhase('playing')
  }, [round, setupBoard])

  /** Show the cat's speech bubble */
  const showCatBubble = useCallback((text: string, duration = 1800) => {
    setBubbleText(text)
    setShowBubble(true)
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
    bubbleTimer.current = setTimeout(() => setShowBubble(false), duration)
  }, [])

  /** Handle tapping an ingredient */
  const handleTap = useCallback((item: string) => {
    if (phase !== 'playing') return
    const isTarget = recipe.targets.includes(item)

    if (isTarget) {
      if (collected.has(item)) return // already collected

      sounds.collect()
      setPopItem(item)
      setTimeout(() => setPopItem(null), 400)

      const newCollected = new Set(collected)
      newCollected.add(item)
      setCollected(newCollected)
      setCatMood('happy')

      const remaining = recipe.targets.length - newCollected.size
      if (remaining <= 0) {
        // Round complete!
        sounds.roundComplete()
        showCatBubble(recipe.doneSays, 2500)
        setCatMood('happy')
        setTimeout(() => {
          if (round < RECIPES.length - 1) {
            setPhase('roundComplete')
          } else {
            setPhase('allComplete')
            sounds.celebrate()
            setTimeout(onComplete, 2200)
          }
        }, 1200)
      } else {
        const msg = CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)]
        showCatBubble(`${msg} (${remaining} left)`)
      }
    } else {
      // Wrong ingredient!
      sounds.wrong()
      setShaking(true)
      setTimeout(() => setShaking(false), 400)
      setCatMood('shocked')

      setWrongItems(prev => new Set(prev).add(item))
      setTimeout(() => {
        setWrongItems(prev => {
          const next = new Set(prev)
          next.delete(item)
          return next
        })
      }, 600)

      showCatBubble(WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)])
      setTimeout(() => setCatMood('chef'), 800)
    }
  }, [phase, recipe, collected, round, onComplete, showCatBubble])

  /** Move to next round */
  const goNextRound = useCallback(() => {
    const nextRound = round + 1
    setRound(nextRound)
    setPhase('intro')
  }, [round])

  /** Auto-advance from intro after delay */
  useEffect(() => {
    if (phase === 'intro') {
      introTimer.current = setTimeout(startPlaying, 2500)
      return () => { if (introTimer.current) clearTimeout(introTimer.current) }
    }
  }, [phase, startPlaying])

  /** Clean up timers */
  useEffect(() => {
    return () => {
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
      if (introTimer.current) clearTimeout(introTimer.current)
    }
  }, [])

  const progress = collected.size / recipe.targets.length

  return (
    <div className={`game-screen ${shaking ? 'screen-shake' : ''}`}>
      {/* Round indicators */}
      <div className="round-indicator">
        {RECIPES.map((_r, i) => (
          <div key={i} className={`round-dot ${i === round ? 'active' : ''} ${i < round ? 'done' : ''}`}>
            <span className="round-dot-num">{i + 1}</span>
          </div>
        ))}
      </div>

      {/* Current recipe badge */}
      <div className="recipe-badge" style={{ borderColor: recipe.color }}>
        <span className="recipe-name" style={{ color: recipe.color }}>{recipe.name}</span>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress * 100}%`, background: recipe.color }}
          />
        </div>
        <span className="progress-label">{collected.size} / {recipe.targets.length}</span>
      </div>

      {/* Round intro overlay */}
      {phase === 'intro' && (
        <div className="round-intro-overlay" onClick={startPlaying}>
          <div className="round-intro-card">
            <CatChef size={80} className="bounce-in" />
            <h2 className="round-intro-title">Round {round + 1}</h2>
            <h3 className="round-intro-recipe" style={{ color: recipe.color }}>{recipe.name}</h3>
            <div className="round-intro-instructions">
              <div className="intro-collect">
                <span className="intro-label">✅ Collect:</span>
                <span className="intro-items">{recipe.targets.join(' ')}</span>
              </div>
              <div className="intro-avoid">
                <span className="intro-label">❌ Avoid:</span>
                <span className="intro-items">{recipe.bad.join(' ')}</span>
              </div>
            </div>
            <p className="tap-to-start">Tap to start! 🐾</p>
          </div>
        </div>
      )}

      {/* Game area: ingredient grid + cat helper */}
      {(phase === 'playing' || phase === 'roundComplete' || phase === 'allComplete') && (
        <div className="game-play-area">
          <div className="ingredient-grid">
            {boardItems.map((item, idx) => {
              const isCollected = collected.has(item)
              const isWrong = wrongItems.has(item)
              const isTarget = recipe.targets.includes(item)
              const isPopping = popItem === item

              return (
                <button
                  key={`${item}-${idx}`}
                  className={`ingredient-tile
                    ${isCollected ? 'collected' : ''}
                    ${isWrong ? 'wrong-shake' : ''}
                    ${isPopping ? 'pop-collect' : ''}
                    ${isTarget && isCollected ? 'target-done' : ''}
                  `}
                  onClick={() => handleTap(item)}
                  disabled={isCollected}
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  <span className="tile-emoji">{item}</span>
                  {isCollected && <span className="tile-check">✓</span>}
                </button>
              )
            })}
          </div>

          {/* Cat helper area */}
          <div className="cat-helper-area">
            <div className={`cat-speech-bubble ${showBubble ? 'visible' : ''}`}>
              <span>{bubbleText}</span>
            </div>
            <div className="cat-helper-figure">
              {catMood === 'chef' && <CatStirring size={100} className="stir-anim" />}
              {catMood === 'happy' && <CatHappy size={80} className="cat-bounce" />}
              {catMood === 'shocked' && <CatShocked size={80} className="cat-wobble" />}
            </div>

            {/* Little pot with collected items */}
            <div className="mini-pot">
              <div className="mini-pot-body">🍲</div>
              <div className="mini-pot-steam">
                {collected.size > 0 && <span className="steam-puff">~</span>}
                {collected.size > 2 && <span className="steam-puff delay">~</span>}
              </div>
              <div className="pot-ingredients">
                {[...collected].map(c => (
                  <span key={c} className="pot-item-mini">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Round complete overlay */}
      {phase === 'roundComplete' && (
        <div className="round-complete-overlay">
          <div className="round-complete-card">
            <CatHappy size={90} className="bounce-in" />
            <h2>Round {round + 1} Complete! 🎉</h2>
            <p className="recipe-done-text">{recipe.doneSays}</p>
            <div className="collected-display">
              {[...collected].map(c => <span key={c} className="done-item">{c}</span>)}
            </div>
            <button className="next-round-btn" onClick={goNextRound}>
              Next Recipe 🐾
            </button>
          </div>
        </div>
      )}

      {/* All complete */}
      {phase === 'allComplete' && (
        <div className="round-complete-overlay">
          <div className="round-complete-card all-done">
            <CatHappy size={100} className="bounce-in" />
            <h2>All Recipes Done! 🎊</h2>
            <p>The love soup is complete!</p>
            <div className="all-recipes-summary">
              {RECIPES.map((r, i) => (
                <span key={i} className="summary-badge" style={{ background: `${r.color}33`, color: r.color }}>
                  {r.name} ✓
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
