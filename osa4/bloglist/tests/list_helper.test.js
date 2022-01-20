const listHelper = require('../src/utils/list_helper')
const {blogs} = require("./test_blogs.js")

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs.slice(0,1))
    expect(result).toBe(blogs[0].likes)
  })
})

describe("favorite blog", () => {
  test("returns correct element from blogs", () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
})

describe("most blogs", () => {
  test("returns correct result from blogs", () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({author: "Robert C. Martin", blogs: 3})
  })
})

describe("most likes", () => {
  test("returns correct result from blogs", () => {
    const result = listHelper.mostLikes(blogs)
    console.log(result)
    expect(result).toEqual({author: "Edsger W. Dijkstra", likes: 17})
  })
})