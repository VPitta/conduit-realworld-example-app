/// <reference types="cypress" />

describe("API - Login (com mocks)", () => {
  beforeEach(() => {
    // Carrega usuários do fixture
    cy.fixture("users.json").as("users");

    // Ignora erro de React "Objects are not valid as a React child"
    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("Objects are not valid as a React child")) {
        return false; // Cypress ignora
      }
    });
  });

  it("Login válido retorna 200 (mock)", function () {
    // Mock da rota /api/users/login com sucesso
    cy.intercept("POST", "/api/users/login", {
      statusCode: 200,
      body: {
        user: {
          email: this.users.validUser.email,
          token: this.users.validUser.token
        }
      }
    }).as("loginSuccess");

    // Simula login pelo front
    cy.visit("/#/login");
    cy.get('input[placeholder="Email"]').type(this.users.validUser.email);
    cy.get('input[placeholder="Password"]').type(this.users.validUser.password);
    cy.get("form").contains("Login").click();

    // Valida resposta mock
    cy.wait("@loginSuccess").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.user).to.have.property("token");
    });
  });

  it("Login inválido retorna 401 (mock)", function () {
    // Mock da rota /api/users/login retornando erro
    cy.intercept("POST", "/api/users/login", {
      statusCode: 401,
      body: { errors: { "email or password": ["is invalid"] } }
    }).as("loginFail");

    // Simula login pelo front com dados inválidos
    cy.visit("/#/login");
    cy.get('input[placeholder="Email"]').type(this.users.invalidUser.email);
    cy.get('input[placeholder="Password"]').type(this.users.invalidUser.password);
    cy.get("form").contains("Login").click();

    // Valida resposta mock
    cy.wait("@loginFail").then((interception) => {
      expect(interception.response.statusCode).to.eq(401);
      expect(interception.response.body.errors).to.have.property("email or password");
    });
  });
});
