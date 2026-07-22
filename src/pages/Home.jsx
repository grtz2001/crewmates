import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="page page-hero">
      <h1 className="hero-h1">Never cram alone.</h1>
      <p className="hero-lead">
        Assemble a study squad from scratch — match subjects, schedules, focus
        styles and snack preferences until group study finally sticks.
      </p>
      <div className="hero-actions">
        <Link to="/create" className="btn-primary-lg">
          + Add a Study Buddy
        </Link>
        <Link to="/gallery" style={{ fontSize: 15 }}>
          See the squad so far →
        </Link>
      </div>

      <div className="feature-list">
        <div>
          <div className="feature-kicker">Pick a lane</div>
          <p className="feature-p">
            Every buddy is a <em>Cram Buddy</em> — quick recall, flashcards — or
            a <em>Deep Diver</em> — big ideas, discussion. The category quietly
            narrows which subjects and study styles make sense for them.
          </p>
        </div>
        <div>
          <div className="feature-kicker">Click, don't type</div>
          <p className="feature-p">
            Subject strength, study style, availability, focus level, snack
            contribution — all clickable, no typing required.
          </p>
        </div>
        <div>
          <div className="feature-kicker">Keep the roster fresh</div>
          <p className="feature-p">
            Edit or retire a buddy any time — the squad gallery keeps a running
            tally on the whole group.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
