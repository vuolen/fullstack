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
})