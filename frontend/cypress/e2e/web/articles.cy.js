/// <reference types="cypress" />

describe("WEB - Artigos", () => {
  beforeEach(() => {
    cy.mockArticles();
    cy.visit("/"); // abre a home
  });

  it("Deve exibir os artigos do feed", () => {
    cy.contains("Artigo 1").should("be.visible");
    cy.contains("Artigo 2").should("be.visible");
  });
});
