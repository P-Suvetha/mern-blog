import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => {
        setPosts(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading posts...</p>

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>All Posts</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map(post => (
        <div className="card" key={post._id}>
          <h2>{post.title}</h2>
          <p style={{ margin: '0.5rem 0' }}>
            By {post.author?.username} · {new Date(post.createdAt).toDateString()}
          </p>
          <p style={{ marginBottom: '1rem' }}>{post.body.substring(0, 120)}...</p>
          <Link to={`/posts/${post._id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Home