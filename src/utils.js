import { AVATAR_COLORS } from './constants'

// Up-to-two-letter initials for the avatar circle.
export function initials(name) {
  const words = (name || '').trim().split(/\s+/).filter(Boolean)
  if (!words.length) return '?'
  return words
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

// Deterministic avatar color from the name, so a buddy always looks the same.
export function avatarBg(name) {
  let sum = 0
  for (const c of name || '?') sum += c.charCodeAt(0)
  return AVATAR_COLORS[sum % AVATAR_COLORS.length]
}

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

// A short profile sentence, ported from the design's detail view.
export function buildBlurb(b) {
  const snack =
    b.snack_contribution === 'None'
      ? 'shows up empty-handed — bring your own'
      : (b.snack_contribution || '').toLowerCase()
  return `${b.name} is a ${(b.category || 'study buddy').toLowerCase()} who brings serious ${b.subject_strength} energy. Study sessions run best with ${(b.study_style || '').toLowerCase()}, ideally during ${(b.availability || '').toLowerCase()}. Focus mode: ${(b.focus_level || '').toLowerCase()}. Snack of choice: ${snack}.`
}
