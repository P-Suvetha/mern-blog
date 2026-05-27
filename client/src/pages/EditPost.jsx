import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => {
        setTitle(res.data.title)
        setBody(res.data.body)
      })
      .catch(err => console.log(err))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`,
        { title, body },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate(`/posts/${id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post')
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem' }}>Edit Post</h2>
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
        <button type="submit" style={{ width: '100%' }}>Update Post</button>
      </form>
    </div>
  )
}

export default EditPost
