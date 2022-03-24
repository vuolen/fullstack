const { render, screen } = require("@testing-library/react")
import userEvent from '@testing-library/user-event'
import CreateBlogForm from "./CreateBlogForm"

describe("CreateBlogForm", () => {
    test("calls handleSubmit with correct data", () => {
        const createBlog = jest.fn()

        const {container} = render(<CreateBlogForm handleSubmit={createBlog} />)

        

        const title = container.querySelector("#title")
        const author = container.querySelector("#author")
        const url = container.querySelector("#url")
        const createButton = screen.getByText("create")

        userEvent.type(title, "My new blog")
        userEvent.type(author, "Me Myself")
        userEvent.type(url, "myblog.com")
        userEvent.click(createButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe("My new blog")
        expect(createBlog.mock.calls[0][0].author).toBe("Me Myself")
        expect(createBlog.mock.calls[0][0].url).toBe("myblog.com")
    })
})