import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetail from './pages/PostDetail'
import CreatePost from './pages/CreatePost'
import ProtectedRoute from './components/ProtectedRoute'
import EditPost from './pages/EditPost'
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create" element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          } />
          <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App