import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState({})
  const createFormRef = useRef()
  
  const [message, setMessage] = useState("")
  const [user, setUser] = useState(null)

  const handleLogin = async (loginData) => {
    try {
      const response = await axios.post("/api/login", loginData)
      blogService.setToken(response.data.token)
      const newUser = response.data
      setUser(newUser)
      window.localStorage.setItem(
        "user", JSON.stringify(newUser)
      )
    } catch (e) {
      setMessage(e.response.data.error)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem("user")
    setUser(null)
    blogService.setToken(null)
  }

  const handleCreate = async (blog) => {
    try {
      const response = await blogService.create(blog)
      setBlogs({...blogs, [blog.id]: blog})
      setMessage(`${blog.title} by ${blog.author} added!`)
      createFormRef.current.toggleVisibility()
    } catch (e) {
      setMessage(e.response.data.error)
    }
  }

  const handleLike = async (blog) => {
    try {
      const response = await blogService.put({...blog, likes: blog.likes + 1})
      setBlogs({...blogs, [blog.id]: response})
    } catch (e) {
      console.log("liking failed", e)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( Object.fromEntries(blogs.map(blog => [blog.id, blog])) )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("user")
    if (loggedUser) {
      const newUser = JSON.parse(loggedUser)
      setUser(newUser)
      blogService.setToken(newUser.token)
    }
  }, [])

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 3000)
    }
  }, [message])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {message ?
          <div>
            <h3>{message}</h3>
          </div> : null}
        <LoginForm handleSubmit={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message ?
        <div>
          <h3>{message}</h3>
        </div> : null}
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      {Object.values(blogs).sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      )}
      <Toggleable buttonLabel="create" ref={createFormRef}>
        <CreateBlogForm
          handleSubmit={handleCreate} />
      </Toggleable>
    </div>
  )
}

export default App
