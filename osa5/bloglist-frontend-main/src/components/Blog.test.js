import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe("Blog", () => {
    const user = {
        name: "Test User",
        username: "testuser"
    }

    const blog = {
        title: "A nice blog",
        author: "Joe Smith",
        url: "joesmith.com",
        likes: 10,
        user
    }

    const renderBlog = blog => render(
        <Blog blog={blog} handleDelete={() => {}} handleLike={() => {}} user={{name: "Test User", username: "testuser"}} />
    )

    test("renders title", () => {
        renderBlog(blog)

        const element = screen.getByText("A nice blog", {exact: false})
        expect(element).toBeDefined()
    })

    test("renders author", () => {
        renderBlog(blog)

        const element = screen.getByText("Joe Smith", {exact: false})
        expect(element).toBeDefined()
    })

    test("doesnt render URL", () => {
        renderBlog(blog)

        const element = screen.queryByText("joesmith.com", {exact: false})
        expect(element).toBeNull()
    })

    test("doesnt render likes", () => {
        renderBlog(blog)

        const element = screen.queryByText("10", {exact: false})
        expect(element).toBeNull()
    })

    test("renders likes when clicked", () => {
        renderBlog(blog)

        const button = screen.getByText("view")
        userEvent.click(button)

        const element = screen.queryByText("10", {exact: false})
        expect(element).toBeDefined()
        
    })

})