import { useState } from 'react'
import {
  CATEGORIES,
  CATEGORY_RULES,
  AVAILABILITY,
  FOCUS,
  SNACKS,
} from '../constants'
import OptionPills from './OptionPills'

const EMPTY = {
  name: '',
  category: 'Cram Buddy',
  subject_strength: '',
  study_style: '',
  availability: '',
  focus_level: '',
  snack_contribution: '',
}

// Shared create/edit form. `initial` seeds the fields (edit), `submitLabel`
// names the primary button, `onSubmit(buddy)` receives the collected values,
// and `footer` lets a page add extra actions (e.g. the delete button).
const BuddyForm = ({ initial, submitLabel, onSubmit, footer }) => {
  const [buddy, setBuddy] = useState({ ...EMPTY, ...initial })

  const setField = (field, value) =>
    setBuddy((prev) => ({ ...prev, [field]: value }))

  // Switching category re-filters the subject/style choices; clear any
  // selection no longer allowed under the new category.
  const setCategory = (cat) => {
    setBuddy((prev) => {
      const rules = CATEGORY_RULES[cat]
      return {
        ...prev,
        category: cat,
        subject_strength: rules.subjects.includes(prev.subject_strength)
          ? prev.subject_strength
          : '',
        study_style: rules.styles.includes(prev.study_style)
          ? prev.study_style
          : '',
      }
    })
  }

  const rules = CATEGORY_RULES[buddy.category] || CATEGORY_RULES['Cram Buddy']

  const canSubmit = Boolean(
    buddy.name.trim() &&
      buddy.category &&
      buddy.subject_strength &&
      buddy.study_style &&
      buddy.availability &&
      buddy.focus_level &&
      buddy.snack_contribution,
  )

  const handleSubmit = () => {
    if (!canSubmit) return
    onSubmit({ ...buddy, name: buddy.name.trim() })
  }

  return (
    <div>
      <div className="field">
        <label className="field-label">Name</label>
        <input
          type="text"
          className="text-input"
          placeholder="e.g. Priya Chen"
          value={buddy.name}
          onChange={(e) => setField('name', e.target.value)}
        />
      </div>

      <div className="field">
        <label className="field-label">Category</label>
        <OptionPills
          options={CATEGORIES}
          value={buddy.category}
          onChange={setCategory}
        />
      </div>

      <div className="field">
        <label className="field-label">Subject Strength</label>
        <OptionPills
          options={rules.subjects}
          value={buddy.subject_strength}
          onChange={(v) => setField('subject_strength', v)}
        />
      </div>

      <div className="field">
        <label className="field-label">Study Style</label>
        <OptionPills
          options={rules.styles}
          value={buddy.study_style}
          onChange={(v) => setField('study_style', v)}
        />
      </div>

      <div className="field">
        <label className="field-label">Availability</label>
        <OptionPills
          options={AVAILABILITY}
          value={buddy.availability}
          onChange={(v) => setField('availability', v)}
        />
      </div>

      <div className="field">
        <label className="field-label">Focus Level</label>
        <OptionPills
          options={FOCUS}
          value={buddy.focus_level}
          onChange={(v) => setField('focus_level', v)}
        />
      </div>

      <div className="field">
        <label className="field-label">Snack Contribution</label>
        <OptionPills
          options={SNACKS}
          value={buddy.snack_contribution}
          onChange={(v) => setField('snack_contribution', v)}
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn-submit"
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{ opacity: canSubmit ? 1 : 0.45 }}
        >
          {submitLabel}
        </button>
        {footer}
      </div>
    </div>
  )
}

export default BuddyForm
