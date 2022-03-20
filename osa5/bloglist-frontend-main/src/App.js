import axios from 'axios'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [URL, setURL] = useState("")
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

  const handleCreate = async (event) => {
   event.preventDefault()
   const response = await blogService.create({
     title, author, URL
   })
   setBlogs([...blogs, response])
   setTitle("")
   setAuthor("")
   setURL("")
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
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
          title: <input type="text" id="title" value={title} onChange={({target}) => setTitle(target.value)}></input><br/>
          author: <input type="text" id="author" value={author} onChange={({target}) => setAuthor(target.value)}></input><br/>
          url: <input type="text" id="url" value={URL} onChange={({target}) =>  setURL(target.value)}></input><br/>
          <input type="submit" value="create"></input>
      </form>
    </div>
  )
}

export default App
