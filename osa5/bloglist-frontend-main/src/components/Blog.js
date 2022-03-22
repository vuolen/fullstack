import { useState } from "react"

const Blog = ({blog}) => {
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
        {blog.likes} <br/>
      </>
      : null}
  </div>)
}

export default Blog