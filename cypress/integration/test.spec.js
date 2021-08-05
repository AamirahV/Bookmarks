describe("Test if title shows", function(){
  it("GET: Test if title shows", function(){
    cy.visit('/')
    cy.get('#title').should("contain", "Bookmark Keeper")
  })
})

describe("Manage Bookmark", function(){
  it("ADD: Add new Bookmark", function(){
    cy.visit('/')
    cy.get('#url').type("http://localhost:3000/bookmark")
    cy.get('#desc').type("Amazing bookmark keeper")
    cy.get('#submit-button').click()

    cy.get('#url1').should("contain", "http://localhost:3000/bookmark")
    cy.get('#desc1').should("contain", "Amazing bookmark keeper")


  })
})
