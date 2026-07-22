import { Routes, Route } from 'react-router-dom'
import ReadBuddies from './pages/ReadBuddies'
import CreateBuddy from './pages/CreateBuddy'
import EditBuddy from './pages/EditBuddy'
import BuddyDetail from './pages/BuddyDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ReadBuddies />} />
      <Route path="/create" element={<CreateBuddy />} />
      <Route path="/edit/:id" element={<EditBuddy />} />
      <Route path="/buddy/:id" element={<BuddyDetail />} />
    </Routes>
  )
}

export default App