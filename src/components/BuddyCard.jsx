import { useNavigate, Link } from 'react-router-dom'
import { initials, avatarBg, formatDate } from '../utils'

// A single buddy in the gallery grid. The whole card links to the detail
// view; the Edit link stops propagation so it doesn't also trigger it.
const BuddyCard = ({ buddy }) => {
  const navigate = useNavigate()

  return (
    <div
      role="link"
      tabIndex={0}
      className="buddy-card"
      onClick={() => navigate(`/buddy/${buddy.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/buddy/${buddy.id}`)
      }}
    >
      <div className="card-head">
        <div
          className="avatar avatar-sm"
          style={{ background: avatarBg(buddy.name) }}
        >
          {initials(buddy.name)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="card-category">{buddy.category}</div>
          <div className="card-name">{buddy.name}</div>
        </div>
      </div>

      <div className="tags">
        <span className="tag tag-accent">{buddy.subject_strength}</span>
        <span className="tag tag-neutral">{buddy.study_style}</span>
        <span className="tag tag-neutral">{buddy.availability}</span>
      </div>

      <div className="card-meta">
        <span className="card-date">{formatDate(buddy.created_at)}</span>
        <Link
          to={`/edit/${buddy.id}`}
          className="card-edit"
          onClick={(e) => e.stopPropagation()}
        >
          Edit
        </Link>
      </div>
    </div>
  )
}

export default BuddyCard
