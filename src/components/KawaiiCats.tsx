/**
 * Adorable kawaii cat SVG components in different poses.
 * Pure CSS + SVG — no image files needed!
 */

interface CatProps {
  size?: number
  className?: string
  style?: React.CSSProperties
}

/** Cute cat face — the main mascot */
export function CatChef({ size = 100, className = '', style }: CatProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`kawaii-cat ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Ears */}
      <polygon points="20,45 35,10 50,40" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="2" />
      <polygon points="70,40 85,10 100,45" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="2" />
      <polygon points="27,40 35,18 43,38" fill="#FF8FAB" />
      <polygon points="77,38 85,18 93,40" fill="#FF8FAB" />

      {/* Head */}
      <ellipse cx="60" cy="65" rx="42" ry="38" fill="#FFD6E8" stroke="#F48FB1" strokeWidth="2" />

      {/* Chef hat */}
      <ellipse cx="60" cy="30" rx="22" ry="14" fill="white" stroke="#F0E0E8" strokeWidth="1.5" />
      <rect x="45" y="28" width="30" height="10" fill="white" />
      <rect x="42" y="36" width="36" height="6" rx="3" fill="white" stroke="#F0E0E8" strokeWidth="1" />
      <text x="60" y="34" textAnchor="middle" fontSize="10" fill="#FF69B4">♡</text>

      {/* Eyes */}
      <ellipse cx="45" cy="62" rx="6" ry="7" fill="#2D1B30" />
      <ellipse cx="75" cy="62" rx="6" ry="7" fill="#2D1B30" />
      <ellipse cx="47" cy="59" rx="2.5" ry="3" fill="white" />
      <ellipse cx="77" cy="59" rx="2.5" ry="3" fill="white" />

      {/* Blush */}
      <ellipse cx="34" cy="73" rx="7" ry="4" fill="#FFB3CC" opacity="0.6" />
      <ellipse cx="86" cy="73" rx="7" ry="4" fill="#FFB3CC" opacity="0.6" />

      {/* Nose */}
      <ellipse cx="60" cy="71" rx="3" ry="2.5" fill="#FF8FAB" />

      {/* Mouth — w shape */}
      <path d="M 54 76 Q 57 80 60 76 Q 63 80 66 76" fill="none" stroke="#F06292" strokeWidth="1.5" strokeLinecap="round" />

      {/* Whiskers */}
      <line x1="15" y1="65" x2="35" y2="68" stroke="#F48FB1" strokeWidth="1" opacity="0.5" />
      <line x1="15" y1="72" x2="35" y2="72" stroke="#F48FB1" strokeWidth="1" opacity="0.5" />
      <line x1="85" y1="68" x2="105" y2="65" stroke="#F48FB1" strokeWidth="1" opacity="0.5" />
      <line x1="85" y1="72" x2="105" y2="72" stroke="#F48FB1" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

/** Happy cat with closed eyes (^ω^) */
export function CatHappy({ size = 100, className = '', style }: CatProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`kawaii-cat ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Ears */}
      <polygon points="20,45 35,10 50,40" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="2" />
      <polygon points="70,40 85,10 100,45" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="2" />
      <polygon points="27,40 35,18 43,38" fill="#FF8FAB" />
      <polygon points="77,38 85,18 93,40" fill="#FF8FAB" />

      {/* Head */}
      <ellipse cx="60" cy="65" rx="42" ry="38" fill="#FFD6E8" stroke="#F48FB1" strokeWidth="2" />

      {/* Happy closed eyes — ^ ^ */}
      <path d="M 38 62 Q 45 54 52 62" fill="none" stroke="#2D1B30" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 68 62 Q 75 54 82 62" fill="none" stroke="#2D1B30" strokeWidth="2.5" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="34" cy="73" rx="7" ry="4" fill="#FFB3CC" opacity="0.7" />
      <ellipse cx="86" cy="73" rx="7" ry="4" fill="#FFB3CC" opacity="0.7" />

      {/* Nose */}
      <ellipse cx="60" cy="71" rx="3" ry="2.5" fill="#FF8FAB" />

      {/* Big happy mouth */}
      <path d="M 50 76 Q 55 84 60 78 Q 65 84 70 76" fill="none" stroke="#F06292" strokeWidth="1.8" strokeLinecap="round" />

      {/* Whiskers */}
      <line x1="15" y1="65" x2="35" y2="68" stroke="#F48FB1" strokeWidth="1" opacity="0.5" />
      <line x1="15" y1="72" x2="35" y2="72" stroke="#F48FB1" strokeWidth="1" opacity="0.5" />
      <line x1="85" y1="68" x2="105" y2="65" stroke="#F48FB1" strokeWidth="1" opacity="0.5" />
      <line x1="85" y1="72" x2="105" y2="72" stroke="#F48FB1" strokeWidth="1" opacity="0.5" />

      {/* Little sparkles */}
      <text x="18" y="40" fontSize="12" fill="#FFD700">✦</text>
      <text x="98" y="40" fontSize="12" fill="#FFD700">✦</text>
    </svg>
  )
}

/** Shocked/surprised cat (for wrong taps) */
export function CatShocked({ size = 100, className = '', style }: CatProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`kawaii-cat ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Ears — more upright */}
      <polygon points="18,42 33,5 50,38" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="2" />
      <polygon points="70,38 87,5 102,42" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="2" />
      <polygon points="26,38 33,14 42,36" fill="#FF8FAB" />
      <polygon points="76,36 87,14 94,38" fill="#FF8FAB" />

      {/* Head */}
      <ellipse cx="60" cy="65" rx="42" ry="38" fill="#FFD6E8" stroke="#F48FB1" strokeWidth="2" />

      {/* Big surprised eyes */}
      <ellipse cx="43" cy="60" rx="9" ry="10" fill="white" stroke="#2D1B30" strokeWidth="1.5" />
      <ellipse cx="77" cy="60" rx="9" ry="10" fill="white" stroke="#2D1B30" strokeWidth="1.5" />
      <ellipse cx="43" cy="62" rx="5" ry="6" fill="#2D1B30" />
      <ellipse cx="77" cy="62" rx="5" ry="6" fill="#2D1B30" />
      <ellipse cx="45" cy="58" rx="2" ry="2.5" fill="white" />
      <ellipse cx="79" cy="58" rx="2" ry="2.5" fill="white" />

      {/* Blush */}
      <ellipse cx="30" cy="73" rx="7" ry="4" fill="#FFB3CC" opacity="0.7" />
      <ellipse cx="90" cy="73" rx="7" ry="4" fill="#FFB3CC" opacity="0.7" />

      {/* Nose */}
      <ellipse cx="60" cy="72" rx="3" ry="2.5" fill="#FF8FAB" />

      {/* "O" mouth */}
      <ellipse cx="60" cy="82" rx="5" ry="4" fill="#F06292" opacity="0.8" />

      {/* Sweat drop */}
      <path d="M 98 45 Q 100 50 98 55 Q 95 50 98 45" fill="#87CEEB" opacity="0.7" />
    </svg>
  )
}

/** Love-struck cat with heart eyes */
export function CatLove({ size = 100, className = '', style }: CatProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`kawaii-cat ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Ears */}
      <polygon points="20,45 35,10 50,40" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="2" />
      <polygon points="70,40 85,10 100,45" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="2" />
      <polygon points="27,40 35,18 43,38" fill="#FF8FAB" />
      <polygon points="77,38 85,18 93,40" fill="#FF8FAB" />

      {/* Head */}
      <ellipse cx="60" cy="65" rx="42" ry="38" fill="#FFD6E8" stroke="#F48FB1" strokeWidth="2" />

      {/* Heart eyes */}
      <path d="M 38 58 C 38 54 42 52 45 55 C 48 52 52 54 52 58 C 52 63 45 68 45 68 C 45 68 38 63 38 58" fill="#FF1493" />
      <path d="M 68 58 C 68 54 72 52 75 55 C 78 52 82 54 82 58 C 82 63 75 68 75 68 C 75 68 68 63 68 58" fill="#FF1493" />

      {/* Blush */}
      <ellipse cx="32" cy="75" rx="8" ry="5" fill="#FFB3CC" opacity="0.8" />
      <ellipse cx="88" cy="75" rx="8" ry="5" fill="#FFB3CC" opacity="0.8" />

      {/* Nose */}
      <ellipse cx="60" cy="71" rx="3" ry="2.5" fill="#FF8FAB" />

      {/* Happy mouth */}
      <path d="M 50 76 Q 55 84 60 78 Q 65 84 70 76" fill="none" stroke="#F06292" strokeWidth="2" strokeLinecap="round" />

      {/* Floating hearts */}
      <text x="10" y="35" fontSize="14" opacity="0.8" fill="#FF69B4">♥</text>
      <text x="100" y="30" fontSize="10" opacity="0.6" fill="#FF1493">♥</text>
      <text x="105" y="50" fontSize="12" opacity="0.7" fill="#FF69B4">♥</text>
    </svg>
  )
}

/** Pleading/sad cat with teary eyes */
export function CatPleading({ size = 100, className = '', style }: CatProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`kawaii-cat ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Ears — droopy */}
      <polygon points="22,48 35,15 52,42" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="2" />
      <polygon points="68,42 85,15 98,48" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="2" />
      <polygon points="29,42 35,22 43,40" fill="#FF8FAB" />
      <polygon points="75,40 85,22 91,42" fill="#FF8FAB" />

      {/* Head */}
      <ellipse cx="60" cy="65" rx="42" ry="38" fill="#FFD6E8" stroke="#F48FB1" strokeWidth="2" />

      {/* Big pleading eyes */}
      <ellipse cx="43" cy="60" rx="10" ry="12" fill="white" stroke="#2D1B30" strokeWidth="1.2" />
      <ellipse cx="77" cy="60" rx="10" ry="12" fill="white" stroke="#2D1B30" strokeWidth="1.2" />
      <ellipse cx="43" cy="63" rx="6" ry="7" fill="#2D1B30" />
      <ellipse cx="77" cy="63" rx="6" ry="7" fill="#2D1B30" />
      <ellipse cx="45" cy="58" rx="3" ry="3.5" fill="white" />
      <ellipse cx="79" cy="58" rx="3" ry="3.5" fill="white" />
      {/* Tear shimmer */}
      <ellipse cx="41" cy="55" rx="1.5" ry="2" fill="white" opacity="0.8" />
      <ellipse cx="75" cy="55" rx="1.5" ry="2" fill="white" opacity="0.8" />

      {/* Eyebrows — worried */}
      <line x1="35" y1="47" x2="48" y2="44" stroke="#C97A96" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="72" y1="44" x2="85" y2="47" stroke="#C97A96" strokeWidth="1.5" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="32" cy="75" rx="7" ry="4" fill="#FFB3CC" opacity="0.7" />
      <ellipse cx="88" cy="75" rx="7" ry="4" fill="#FFB3CC" opacity="0.7" />

      {/* Nose */}
      <ellipse cx="60" cy="72" rx="3" ry="2.5" fill="#FF8FAB" />

      {/* Sad mouth */}
      <path d="M 53 80 Q 60 76 67 80" fill="none" stroke="#C97A96" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Tiny cat paw print decorations */
export function PawPrint({ size = 24, className = '', style }: CatProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <ellipse cx="20" cy="26" rx="9" ry="7" fill="#FFB6C1" opacity="0.6" />
      <circle cx="11" cy="16" r="4" fill="#FFB6C1" opacity="0.6" />
      <circle cx="20" cy="13" r="4" fill="#FFB6C1" opacity="0.6" />
      <circle cx="29" cy="16" r="4" fill="#FFB6C1" opacity="0.6" />
    </svg>
  )
}

/** Floating sticker cat (a mini sitting cat) */
export function CatSticker({ size = 60, className = '', style }: CatProps) {
  return (
    <svg
      viewBox="0 0 80 90"
      width={size}
      height={size}
      className={`kawaii-cat ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Body */}
      <ellipse cx="40" cy="62" rx="22" ry="24" fill="#FFD6E8" stroke="#F48FB1" strokeWidth="1.5" />

      {/* Tail */}
      <path d="M 62 65 Q 75 50 70 40" fill="none" stroke="#FFB6C1" strokeWidth="4" strokeLinecap="round" />

      {/* Head */}
      <ellipse cx="40" cy="35" rx="22" ry="20" fill="#FFD6E8" stroke="#F48FB1" strokeWidth="1.5" />

      {/* Ears */}
      <polygon points="20,26 28,6 36,22" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="1.5" />
      <polygon points="44,22 52,6 60,26" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="1.5" />
      <polygon points="25,23 28,11 33,21" fill="#FF8FAB" />
      <polygon points="47,21 52,11 55,23" fill="#FF8FAB" />

      {/* Eyes */}
      <path d="M 30 33 Q 35 28 40 33" fill="none" stroke="#2D1B30" strokeWidth="2" strokeLinecap="round" />
      <path d="M 40 33 Q 45 28 50 33" fill="none" stroke="#2D1B30" strokeWidth="2" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="26" cy="39" rx="5" ry="3" fill="#FFB3CC" opacity="0.6" />
      <ellipse cx="54" cy="39" rx="5" ry="3" fill="#FFB3CC" opacity="0.6" />

      {/* Nose */}
      <ellipse cx="40" cy="38" rx="2" ry="1.5" fill="#FF8FAB" />

      {/* Mouth */}
      <path d="M 36 42 Q 38 45 40 42 Q 42 45 44 42" fill="none" stroke="#F06292" strokeWidth="1" strokeLinecap="round" />

      {/* Paws */}
      <ellipse cx="30" cy="80" rx="8" ry="5" fill="#FFD6E8" stroke="#F48FB1" strokeWidth="1" />
      <ellipse cx="50" cy="80" rx="8" ry="5" fill="#FFD6E8" stroke="#F48FB1" strokeWidth="1" />
    </svg>
  )
}

/** Cat with a spoon — stirring animation variant */
export function CatStirring({ size = 120, className = '', style }: CatProps) {
  return (
    <svg
      viewBox="0 0 140 130"
      width={size}
      height={size}
      className={`kawaii-cat ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Body */}
      <ellipse cx="55" cy="90" rx="28" ry="30" fill="#FFD6E8" stroke="#F48FB1" strokeWidth="1.5" />

      {/* Spoon arm */}
      <g className="stir-arm">
        <line x1="78" y1="80" x2="115" y2="55" stroke="#FFD6E8" strokeWidth="8" strokeLinecap="round" />
        <line x1="78" y1="80" x2="115" y2="55" stroke="#F48FB1" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Spoon */}
        <ellipse cx="120" cy="48" rx="10" ry="6" fill="#DDD" stroke="#BBB" strokeWidth="1" transform="rotate(-30 120 48)" />
      </g>

      {/* Head */}
      <ellipse cx="55" cy="50" rx="30" ry="28" fill="#FFD6E8" stroke="#F48FB1" strokeWidth="1.5" />

      {/* Ears */}
      <polygon points="28,34 38,8 48,28" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="1.5" />
      <polygon points="62,28 72,8 82,34" fill="#FFB6C1" stroke="#F48FB1" strokeWidth="1.5" />
      <polygon points="34,30 38,14 44,27" fill="#FF8FAB" />
      <polygon points="66,27 72,14 76,30" fill="#FF8FAB" />

      {/* Chef hat */}
      <ellipse cx="55" cy="25" rx="18" ry="12" fill="white" stroke="#F0E0E8" strokeWidth="1.2" />
      <rect x="42" y="24" width="26" height="8" fill="white" />
      <rect x="40" y="30" width="30" height="5" rx="2.5" fill="white" stroke="#F0E0E8" strokeWidth="1" />
      <text x="55" y="28" textAnchor="middle" fontSize="8" fill="#FF69B4">♡</text>

      {/* Happy closed eyes */}
      <path d="M 42 48 Q 47 42 53 48" fill="none" stroke="#2D1B30" strokeWidth="2" strokeLinecap="round" />
      <path d="M 57 48 Q 63 42 68 48" fill="none" stroke="#2D1B30" strokeWidth="2" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="37" cy="57" rx="6" ry="3.5" fill="#FFB3CC" opacity="0.7" />
      <ellipse cx="73" cy="57" rx="6" ry="3.5" fill="#FFB3CC" opacity="0.7" />

      {/* Nose */}
      <ellipse cx="55" cy="54" rx="2.5" ry="2" fill="#FF8FAB" />

      {/* Mouth */}
      <path d="M 49 58 Q 52 63 55 59 Q 58 63 61 58" fill="none" stroke="#F06292" strokeWidth="1.2" strokeLinecap="round" />

      {/* Paws */}
      <ellipse cx="38" cy="110" rx="10" ry="6" fill="#FFD6E8" stroke="#F48FB1" strokeWidth="1" />
      <ellipse cx="68" cy="110" rx="10" ry="6" fill="#FFD6E8" stroke="#F48FB1" strokeWidth="1" />
    </svg>
  )
}
