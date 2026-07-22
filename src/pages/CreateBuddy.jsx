import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import BuddyForm from '../components/BuddyForm'

const CreateBuddy = () => {
  const navigate = useNavigate()

  // CREATE a new study buddy, then head to the gallery.
  const createBuddy = async (buddy) => {
    const { error } = await supabase.from('study_buddies').insert(buddy).select()

    if (error) {
      console.error(error)
      return
    }
    navigate('/gallery')
  }

  return (
    <div className="page page-form">
      <h1 className="h-form">Add a Study Buddy</h1>
      <p className="subtitle">
        Pick a category, then fill in the details — every click builds their
        study profile.
      </p>
      <BuddyForm submitLabel="Add to the squad" onSubmit={createBuddy} />
    </div>
  )
}

export default CreateBuddy
