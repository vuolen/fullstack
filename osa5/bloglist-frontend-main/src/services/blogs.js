import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => { token = `bearer ${newToken}` }

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (blog) => {
    const config = { headers: { Authorization: token } }
    const request = axios.post(baseUrl, blog, config)
    return request.then(response => response.data)
}

const put = (blog) => {
    const config = { headers: { Authorization: token } }
    const request = axios.put(baseUrl + "/" + blog.id, blog, config)
    return request.then(response => response.data)
}

const del = (blog) => {
    const config = { headers: { Authorization: token } }
    const request = axios.delete(baseUrl + "/" + blog.id, config)
    return request.then(response => response.data)
}

export default { getAll, setToken, create, put, del }