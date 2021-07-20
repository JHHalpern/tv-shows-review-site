/// <reference types="Cypress" />

describe("a user visiting the show list page", () => {
  beforeEach(() => {
    cy.task("db:truncate", "Show")
    cy.task("db:insert", { modelName: "Show", json: {name: "Supernatural", description: "Brothers fighting monsters"}})
    cy.task("db:insert", { modelName: "Show", json: {name: "Friends", description: "Friends will be there for you"}})
    cy.visit("/shows")
  })

  it("shows me the title of a tv show", () => {
    cy.get("#shows").within(() => {
      cy.get("li").first().within(() => {
        cy.get("h3").should("have.text", "Supernatural")
      })
    })
  })

  it("shows me the description of a tv show", () => {
    cy.get("#shows").within(() => {
      cy.get("li").first().within(() => {
        cy.get("p").should("have.text", "Brothers fighting monsters")
      })
    })
  })

  it("shows me the title of all of the tv shows", () => {
    cy.get("#shows").within(() => {
      cy.get("li").last().within(() => {
        cy.get("h3").should("have.text", "Friends")
      })
    })
  })

  it("shows me the description of all of the tv shows", () => {
    cy.get("#shows").within(() => {
      cy.get("li").last().within(() => {
        cy.get("p").should("have.text", "Friends will be there for you")
      })
    })
  })
})