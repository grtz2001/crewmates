import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import ReadBuddies from './pages/ReadBuddies'
import CreateBuddy from './pages/CreateBuddy'
import EditBuddy from './pages/EditBuddy'
import BuddyDetail from './pages/BuddyDetail'

function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<ReadBuddies />} />
        <Route path="/create" element={<CreateBuddy />} />
        <Route path="/edit/:id" element={<EditBuddy />} />
        <Route path="/buddy/:id" element={<BuddyDetail />} />
      </Routes>
    </div>
  )
}

export default App
