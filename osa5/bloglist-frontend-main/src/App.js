import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const createFormRef = useRef()
  
  const [message, setMessage] = useState("")
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post("/api/login", {username, password})
      blogService.setToken(response.data.token)
      const newUser = response.data
      setUser(newUser)
      setUsername("")
      setPassword("")
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
      setBlogs([...blogs, response])
      setMessage(`${blog.title} by ${blog.author} added!`)
      createFormRef.current.toggleVisibility()
    } catch (e) {
      setMessage(e.response.data.error)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
        <form onSubmit={handleLogin}>
          username: <input type="text" id="username" value={username} onChange={({target}) => setUsername(target.value)}></input><br/>
          password: <input type="password" id="password" value={password} onChange={({target}) => setPassword(target.value)}></input><br/>
          <input type="submit" value="Log in"></input>
        </form>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Toggleable buttonLabel="create" ref={createFormRef}>
        <CreateBlogForm
          handleSubmit={handleCreate} />
      </Toggleable>
    </div>
  )
}

export default App
