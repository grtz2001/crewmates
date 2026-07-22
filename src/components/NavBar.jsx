import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="nav">
      <Link to="/" className="nav-brand">
        StudySquad
      </Link>
      <NavLink
        to="/gallery"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        The Squad
      </NavLink>
      <Link to="/create" className="btn-primary">
        + Add a Study Buddy
      </Link>
    </div>
  )
}

export default NavBar
