import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsername } from '../store/userSlice'

function EditUsername({ onClose }) {
  const dispatch = useDispatch()
  const { userName } = useSelector((state) => state.user)
  const [newUsername, setNewUsername] = useState(userName)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newUsername.trim()) {
      setError('Username cannot be empty')
      return
    }
    const result = await dispatch(updateUsername(newUsername))
    if (updateUsername.fulfilled.match(result)) {
      onClose()
    } else {
      setError('Failed to update username')
    }
  }

  return (
    <div className="edit-username">
      <h2>Edit user info</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">User name</label>
          <input
            type="text"
            id="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button type="submit" className="edit-button">Save</button>
          <button type="button" className="edit-button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditUsername