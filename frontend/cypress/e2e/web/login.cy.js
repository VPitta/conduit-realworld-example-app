/// <reference types="cypress" />

describe("WEB - Login via UI", () => {
  beforeEach(() => {
    cy.fixture("users.json").as("users");
    cy.fixture("articles.json").then((articles) => {
      // Mock de todos os endpoints de artigos
      cy.intercept("GET", "/api/articles*", {
        statusCode: 200,
        body: articles
      }).as("getArticles");

      cy.intercept("GET", "/api/articles/feed*", {
        statusCode: 200,
        body: articles
      }).as("getFeedArticles");
    });

    // Mock do login
    cy.fixture("users.json").then((users) => {
      cy.intercept("POST", "/api/users/login", {
        statusCode: 200,
        body: {
          user: {
            email: users.validUser.email,
            token: users.validUser.token,
          }
        }
      }).as("loginRequest");
    });

    // Ignora erro do React
    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("Objects are not valid as a React child")) return false;
    });
  });

  it("Deve logar com sucesso via UI e ver feed", function () {
    cy.loginUI(this.users.validUser);

    // Espera o login mockado
    cy.wait("@loginRequest");

    // Espera o feed mockado
    cy.wait("@getFeedArticles");

    // Valida visualmente os artigos
    cy.contains("Artigo 1").should("be.visible");
    cy.contains("Artigo 2").should("be.visible");
  });
});
