import { func } from 'prop-types'
import { useState } from 'react'

const LoginForm = ({
    handleSubmit
}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div>
            <h2>login</h2>
            <form onSubmit={event => {
                event.preventDefault()
                handleSubmit({ username, password })
                setUsername("")
                setPassword("")
            }}>
                username: <input type="text" id="username" value={username} onChange={({ target }) => setUsername(target.value)}></input><br />
                password: <input type="password" id="password" value={password} onChange={({ target }) => setPassword(target.value)}></input><br />
                <input type="submit" value="Log in"></input>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: func.isRequired
}

export default LoginForm