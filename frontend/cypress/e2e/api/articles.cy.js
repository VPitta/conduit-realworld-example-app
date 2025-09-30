/// <reference types="cypress" />

describe("API - Artigos (com mocks)", () => {
  beforeEach(() => {
    // Ignora erro do React
    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("Objects are not valid as a React child")) {
        return false;
      }
    });

    // Mock da rota /api/articles
    cy.fixture("articles.json").then((articles) => {
      cy.intercept("GET", "/api/articles*",
        {
          statusCode: 200,
          body: articles
        }
      ).as("getArticles");
    });
  });

  it("Deve listar artigos do feed", () => {
    cy.visit("/"); // abre a home

    // Espera a rota mockada e valida
    cy.wait("@getArticles").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.articles).to.have.length(2);
      expect(interception.response.body.articles[0]).to.have.property("title", "Artigo 1");
      expect(interception.response.body.articles[1]).to.have.property("title", "Artigo 2");
    });

    // Valida visualmente os artigos carregados na interface
    cy.contains("Artigo 1").should("be.visible");
    cy.contains("Artigo 2").should("be.visible");
  });
});
