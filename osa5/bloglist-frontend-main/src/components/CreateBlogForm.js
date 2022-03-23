import { func } from 'prop-types'
import { useState } from 'react'

const CreateBlogForm = ({
        handleSubmit
    }) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [URL, setURL] = useState("")
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={event => {
                event.preventDefault()
                handleSubmit({title, author, url: URL})
                setTitle("")
                setAuthor("")
                setURL("")
            }}>
                title: <input type="text" id="title" value={title} onChange={({target}) => setTitle(target.value)}></input><br />
                author: <input type="text" id="author" value={author} onChange={({target}) => setAuthor(target.value)}></input><br />
                url: <input type="text" id="url" value={URL} onChange={({target}) => setURL(target.value)}></input><br />
                <input type="submit" value="create"></input>
            </form>
        </div>
    )
}

CreateBlogForm.propTypes = {
    handleSubmit: func.isRequired
}

export default CreateBlogForm