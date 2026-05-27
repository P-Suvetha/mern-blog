import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => {
        setPost(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) return <p>Loading...</p>
  if (!post) return <p>Post not found.</p>

  return (
    <div className="card">
      <h1 style={{ marginBottom: '0.5rem' }}>{post.title}</h1>
      <p style={{ color: '#888', marginBottom: '1.5rem' }}>
        By {post.author?.username} · {new Date(post.createdAt).toDateString()}
      </p>
      <p style={{ lineHeight: '1.8', marginBottom: '1.5rem' }}>{post.body}</p>
      {user && user.id === post.author?._id && (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <button
      onClick={() => navigate(`/edit/${post._id}`)}
      style={{ backgroundColor: '#3498db' }}
    >
      Edit Post
    </button>
    <button
      onClick={handleDelete}
      style={{ backgroundColor: '#e74c3c' }}
    >
      Delete Post
    </button>
  </div>
)}
    </div>
  )
}

export default PostDetail