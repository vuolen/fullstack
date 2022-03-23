import { useState } from "react"

const Blog = ({blog, handleLike, handleDelete, user}) => {
  const [expanded, setExpanded] = useState(false)
  const blogStyle = {
    margin: "10px"
  }
  
  return (<div style={blogStyle}>
    {blog.title} 
    <button onClick={() => setExpanded(!expanded)}>
      {expanded ? "hide" : "view"} 
    </button>
    <br/>
    {expanded ? 
      <>
        {blog.author} <br/>
        {blog.url} <br/>
        {blog.likes}
        <button onClick={() => handleLike(blog)}>
          like
        </button> <br/>
        Added by {blog.user.name}
        {user.username === blog.user.username ? 
          <button onClick={() => handleDelete(blog)}>
            remove
          </button> 
          : null}
      </>
      : null}
  </div>)
}

export default Blog