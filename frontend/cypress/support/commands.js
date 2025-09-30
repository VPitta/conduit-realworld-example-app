// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ==== MOCK LOGIN API ====
Cypress.Commands.add("mockLogin", (user) => {
  cy.intercept("POST", "/api/users/login", {
    statusCode: 200,
    body: {
      user: {
        email: user.email,
        token: user.token
      }
    }
  }).as("loginRequest");
});

// ==== MOCK LOGIN INVÁLIDO ====
Cypress.Commands.add("mockLoginFail", () => {
  cy.intercept("POST", "/api/users/login", {
    statusCode: 401,
    body: { errors: { "email or password": ["is invalid"] } }
  }).as("loginFail");
});

// ==== MOCK ARTICLES ====
Cypress.Commands.add("mockArticles", () => {
  cy.fixture("articles.json").then((articles) => {
    cy.intercept("GET", "/api/articles*", {
      statusCode: 200,
      body: articles
    }).as("getArticles");
  });
});
// Comando customizado para login via UI
Cypress.Commands.add("loginUI", (user) => {
  cy.visit("/#/login");

  cy.get('input[placeholder="Email"]').type(user.email);
  cy.get('input[placeholder="Password"]').type(user.password);

  cy.get("form").contains("Login").click();
});
