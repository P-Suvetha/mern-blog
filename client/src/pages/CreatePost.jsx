import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/posts',
        { title, body },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post')
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem' }}>Create New Post</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your post content here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="10"
          required
        />
        <button type="submit" style={{ width: '100%' }}>Publish Post</button>
      </form>
    </div>
  )
}

export default CreatePost