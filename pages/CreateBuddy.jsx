import { useState } from 'react'
import { supabase } from '../client'

const CreateBuddy = () => {
  const [buddy, setBuddy] = useState({
    name: '',
    subject_strength: '',
    study_style: '',
    availability: '',
    focus_level: '',
    snack_contribution: '',
  })

  // update state whenever a field changes
  const handleChange = (field, value) => {
    setBuddy((prev) => ({ ...prev, [field]: value }))
  }

  // CREATE a new study buddy in the table
  const createBuddy = async (event) => {
    event.preventDefault()

    await supabase
      .from('study_buddies')
      .insert({
        name: buddy.name,
        subject_strength: buddy.subject_strength,
        study_style: buddy.study_style,
        availability: buddy.availability,
        focus_level: buddy.focus_level,
        snack_contribution: buddy.snack_contribution,
      })
      .select()

    window.location = '/'
  }

  return (
    <div>
      <h1>Add a Study Buddy</h1>
      <form>
        <label>Name</label>
        <input
          type="text"
          value={buddy.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <label>Subject Strength</label>
        <div>
          {['Math', 'Science', 'English', 'History', 'Coding'].map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => handleChange('subject_strength', option)}
              style={{
                fontWeight: buddy.subject_strength === option ? 'bold' : 'normal',
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* repeat the same button pattern for study_style, availability,
            focus_level, and snack_contribution */}

        <input type="submit" value="Submit" onClick={createBuddy} />
      </form>
    </div>
  )
}

export default CreateBuddy