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

    const stub = () => {}

    const defaultProps = {
        blog: blog,
        handleDelete: stub,
        handleLike: stub,
        user: user
    }

    const renderBlog = (props) => render(
        <Blog {...props} />
    )

    test("renders title", () => {
        renderBlog(defaultProps)

        const element = screen.getByText("A nice blog", {exact: false})
        expect(element).toBeDefined()
    })

    test("renders author", () => {
        renderBlog(defaultProps)

        const element = screen.getByText("Joe Smith", {exact: false})
        expect(element).toBeDefined()
    })

    test("doesnt render URL", () => {
        renderBlog(defaultProps)

        const element = screen.queryByText("joesmith.com", {exact: false})
        expect(element).toBeNull()
    })

    test("doesnt render likes", () => {
        renderBlog(defaultProps)

        const element = screen.queryByText("10", {exact: false})
        expect(element).toBeNull()
    })

    test("renders likes when clicked", () => {
        renderBlog(defaultProps)

        const button = screen.getByText("view")
        userEvent.click(button)

        const element = screen.queryByText("10", {exact: false})
        expect(element).toBeDefined()

    })

    test("handleLike gets called twice when liked twice", () => {
        const mockHandleLike = jest.fn()

        renderBlog({
            ...defaultProps,
            handleLike: mockHandleLike
        })

        const viewButton = screen.getByText("view")
        userEvent.click(viewButton)

        const likeButton = screen.getByText("like")
        userEvent.click(likeButton)
        userEvent.click(likeButton)

        expect(mockHandleLike.mock.calls).toHaveLength(2)
    })

})