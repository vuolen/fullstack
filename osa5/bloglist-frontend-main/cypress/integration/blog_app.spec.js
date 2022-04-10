// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request("POST", "http://localhost:3003/api/users", {
        name: "Test Testersson",
        username: "testuser",
        password: "testpassword"
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains("Log in")
    cy.get("input#username")
    cy.get("input#password")
  })

  describe("Login", function() {
    it('succeeds with correct credentials', function() {
        cy.get("input#username").type("testuser")
        cy.get("input#password").type("testpassword")
        cy.get("form").submit()
        cy.contains("Test Testersson logged in")
    })

    it('fails with wrong credentials', function() {
        cy.get("input#username").type("testuser")
        cy.get("input#password").type("wrongpassword")
        cy.get("form").submit()
        cy.contains("invalid username or password")
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get("input#username").type("testuser")
      cy.get("input#password").type("testpassword")
      cy.get("form").submit()
    })
    
    const createBlog = (title, author, url) => {
      cy.contains("create").click()
      cy.get("input#title").type(title)
      cy.get("input#author").type(author)
      cy.get("input#url").type(url)
      cy.get("form").submit()
    }

    it('A blog can be created', function() {
      createBlog("Test Blog Title", "Test Blog Author", "testblogurl.com")  

      cy.contains("Test Blog Title by Test Blog Author")
    })

    it('A blog can be liked', function() {
      createBlog("Test Blog Title", "Test Blog Author", "testblogurl.com")  

      cy.contains("view").click()
      cy.contains("like").click()

      cy.contains("1")
    })

    it('A blog can be removed', function () {
      createBlog("Test Blog Title", "Test Blog Author", "testblogurl.com")  

      cy.contains("view").click()
      cy.contains("remove").click()

      cy.contains("Test Blog Title").should("not.exist")
    })

    it('Blogs are sorted by likes', function () {
      createBlog("Most liked", "Author 1", "fakeauthor.com")  
      createBlog("Second most liked", "Author 2", "fakeauthor.com")  
      createBlog("Least liked", "Author 3", "fakeauthor.com")

      cy.contains("Most liked").then((blog) => {
        const wrap = cy.wrap(blog)
        wrap.contains("view").click()
        wrap.contains("like").click()
        wrap.contains("like").click()
        wrap.contains("like").click()
      })
    })
  })
})