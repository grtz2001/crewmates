import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import BuddyCard from '../components/BuddyCard'

const ReadBuddies = () => {
  const [buddies, setBuddies] = useState([])
  const [loading, setLoading] = useState(true)

  // READ every buddy, newest recruit first.
  useEffect(() => {
    const fetchBuddies = async () => {
      const { data, error } = await supabase
        .from('study_buddies')
        .select()
        .order('created_at', { ascending: false })

      if (error) console.error(error)
      setBuddies(data || [])
      setLoading(false)
    }
    fetchBuddies()
  }, [])

  // Running tally on the whole squad.
  const stats = useMemo(() => {
    const total = buddies.length
    const mathPct = total
      ? Math.round(
          (buddies.filter((b) => b.subject_strength === 'Math').length /
            total) *
            100,
        )
      : 0

    let topAvailability = '—'
    if (total) {
      const counts = {}
      buddies.forEach((b) => {
        counts[b.availability] = (counts[b.availability] || 0) + 1
      })
      topAvailability = Object.keys(counts).reduce((a, b) =>
        counts[b] > counts[a] ? b : a,
      )
    }
    return { total, mathPct, topAvailability }
  }, [buddies])

  return (
    <div className="page">
      <h1 className="h-page">The Squad</h1>
      <p className="subtitle subtitle-tight">
        Everyone currently on the roster, newest recruit first.
      </p>

      {loading ? (
        <div className="loading">Loading the squad…</div>
      ) : buddies.length === 0 ? (
        <div className="empty">
          <p>No study buddies yet. Recruit your first one.</p>
          <Link to="/create" className="btn-primary-lg">
            + Add a Study Buddy
          </Link>
        </div>
      ) : (
        <>
          <div className="stats">
            <span className="stat stat-accent">
              {stats.mathPct}% strong in Math
            </span>
            <span className="stat stat-pink">
              Most free: {stats.topAvailability}
            </span>
            <span className="stat stat-neutral">
              {stats.total} buddies total
            </span>
          </div>

          <div className="grid">
            {buddies.map((buddy) => (
              <BuddyCard key={buddy.id} buddy={buddy} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ReadBuddies
