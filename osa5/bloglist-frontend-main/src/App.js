import axios from 'axios'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    const response = await axios.post("/api/login", {username, password})
    blogService.setToken(response.data.token)
    const newUser = response.data
    setUser(newUser)
    setUsername("")
    setPassword("")
    window.localStorage.setItem(
      "user", JSON.stringify(newUser)
    )
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem("user")
    setUser(null)
    blogService.setToken(null)
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          username: <input type="text" id="username" onChange={({target}) => setUsername(target.value)}></input><br/>
          password: <input type="password" id="password" onChange={({target}) => setPassword(target.value)}></input><br/>
          <input type="submit" value="Log in"></input>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
