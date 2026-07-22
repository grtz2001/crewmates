import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'
import BuddyForm from '../components/BuddyForm'

const EditBuddy = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [buddy, setBuddy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [confirmOpen, setConfirmOpen] = useState(false)

  // READ the buddy being edited.
  useEffect(() => {
    const fetchBuddy = async () => {
      const { data, error } = await supabase
        .from('study_buddies')
        .select()
        .eq('id', id)
        .single()

      if (error) console.error(error)
      setBuddy(data || null)
      setLoading(false)
    }
    fetchBuddy()
  }, [id])

  // UPDATE the buddy, then go to their detail page.
  const updateBuddy = async (fields) => {
    const { error } = await supabase
      .from('study_buddies')
      .update({
        name: fields.name,
        category: fields.category,
        subject_strength: fields.subject_strength,
        study_style: fields.study_style,
        availability: fields.availability,
        focus_level: fields.focus_level,
        snack_contribution: fields.snack_contribution,
      })
      .eq('id', id)

    if (error) {
      console.error(error)
      return
    }
    navigate(`/buddy/${id}`)
  }

  // DELETE the buddy for good.
  const deleteBuddy = async () => {
    const { error } = await supabase
      .from('study_buddies')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error)
      return
    }
    navigate('/gallery')
  }

  if (loading) {
    return (
      <div className="page page-form">
        <div className="loading">Loading…</div>
      </div>
    )
  }

  if (!buddy) {
    return (
      <div className="page page-form">
        <Link to="/gallery" className="back-link">
          ← Back to the squad
        </Link>
        <p style={{ marginTop: 20 }}>That study buddy could not be found.</p>
      </div>
    )
  }

  return (
    <div className="page page-form">
      <h1 className="h-form">Edit {buddy.name}</h1>
      <p className="subtitle">Update the details — changes save right away.</p>

      <BuddyForm
        initial={buddy}
        submitLabel="Save changes"
        onSubmit={updateBuddy}
        footer={
          <button
            type="button"
            className="btn-danger-outline"
            onClick={() => setConfirmOpen(true)}
          >
            Delete buddy
          </button>
        }
      />

      {confirmOpen && (
        <div className="dialog-backdrop">
          <div className="dialog">
            <div className="dialog-title">Delete {buddy.name}?</div>
            <div className="dialog-body">
              This removes them from the squad for good — there's no undo.
            </div>
            <div className="dialog-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>
              <button type="button" className="btn-danger" onClick={deleteBuddy}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditBuddy
