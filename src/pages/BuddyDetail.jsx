import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'
import { initials, avatarBg, formatDate, buildBlurb } from '../utils'

const BuddyDetail = () => {
  const { id } = useParams()
  const [buddy, setBuddy] = useState(null)
  const [loading, setLoading] = useState(true)

  // READ one buddy by id.
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

  if (loading) {
    return (
      <div className="page page-narrow">
        <div className="loading">Loading…</div>
      </div>
    )
  }

  if (!buddy) {
    return (
      <div className="page page-narrow">
        <Link to="/gallery" className="back-link">
          ← Back to the squad
        </Link>
        <p style={{ marginTop: 20 }}>That study buddy could not be found.</p>
      </div>
    )
  }

  const rows = [
    ['Subject strength', buddy.subject_strength],
    ['Study style', buddy.study_style],
    ['Availability', buddy.availability],
    ['Focus level', buddy.focus_level],
    ['Snack contribution', buddy.snack_contribution],
  ]

  return (
    <div className="page page-narrow">
      <Link to="/gallery" className="back-link">
        ← Back to the squad
      </Link>

      <div className="detail-head">
        <div
          className="avatar avatar-lg"
          style={{ background: avatarBg(buddy.name) }}
        >
          {initials(buddy.name)}
        </div>
        <div>
          <div className="card-category">{buddy.category}</div>
          <h1 className="detail-h1">{buddy.name}</h1>
        </div>
      </div>

      <p className="detail-blurb">{buildBlurb(buddy)}</p>

      <div className="detail-rows">
        {rows.map(([label, value]) => (
          <div className="detail-row" key={label}>
            <span className="label">{label}</span>
            <span className="value">{value}</span>
          </div>
        ))}
        <div className="detail-row last">
          <span className="label">Joined the squad</span>
          <span className="value light">{formatDate(buddy.created_at)}</span>
        </div>
      </div>

      <Link to={`/edit/${buddy.id}`} className="btn-primary">
        Edit profile
      </Link>
    </div>
  )
}

export default BuddyDetail
