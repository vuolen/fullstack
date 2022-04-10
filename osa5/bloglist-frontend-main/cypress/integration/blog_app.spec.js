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

    it('A blog can be created', function() {
      cy.contains("create").click()
      cy.get("input#title").type("Test Blog Title")
      cy.get("input#author").type("Test Blog Author")
      cy.get("input#url").type("testblogurl.com")
      cy.get("form").submit()

      cy.contains("Test Blog Title by Test Blog Author")
    })

    it('A blog can be liked', function() {
      cy.contains("create").click()
      cy.get("input#title").type("Test Blog Title")
      cy.get("input#author").type("Test Blog Author")
      cy.get("input#url").type("testblogurl.com")
      cy.get("form").submit()

      cy.contains("view").click()
      cy.contains("like").click()

      cy.contains("1")
    })

    it('A blog can be removed', function () {
      cy.contains("create").click()
      cy.get("input#title").type("Test Blog Title")
      cy.get("input#author").type("Test Blog Author")
      cy.get("input#url").type("testblogurl.com")
      cy.get("form").submit()

      cy.contains("view").click()
      cy.contains("remove").click()

      cy.contains("Test Blog Title").should("not.exist")
    })
  })
})