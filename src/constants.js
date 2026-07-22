// Study-buddy option lists and the category rules, ported from the
// StudySquad design. The category quietly narrows which subjects and
// study styles make sense for a given buddy.

export const SUBJECTS = ['Math', 'Science', 'English', 'History', 'Coding']
export const STYLES = [
  'Quiet/Solo-adjacent',
  'Group Discussion',
  'Flashcards',
  'Teaching Others',
]
export const AVAILABILITY = ['Mornings', 'Afternoons', 'Evenings', 'Late Night']
export const FOCUS = ['Laser-Focused', 'Easily Distracted', 'Steady Pace']
export const SNACKS = ['Coffee', 'Chips', 'Fruit', 'None']
export const CATEGORIES = ['Cram Buddy', 'Deep Diver']

// Each category limits the subject-strength and study-style choices.
export const CATEGORY_RULES = {
  'Cram Buddy': {
    subjects: ['Math', 'Science', 'Coding'],
    styles: ['Flashcards', 'Quiet/Solo-adjacent'],
  },
  'Deep Diver': {
    subjects: ['English', 'History', 'Coding'],
    styles: ['Group Discussion', 'Teaching Others'],
  },
}

export const AVATAR_COLORS = ['#0088b0', '#d6006c', '#605d5d']
