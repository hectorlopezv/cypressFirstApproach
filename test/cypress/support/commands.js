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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("LoginUser", function(username, password, elemento) {
  cy.get("#email1").type(username);
  cy.get("#password1").type(password);
  cy.contains(elemento).click();
  cy.wait(3000);
});
Cypress.Commands.add("AddUser", function(
  nombre,
  company,
  email,
  password,
  element
) {
    cy.contains("Crear una cuenta").click();
    cy.get("#name").type(nombre);
    cy.get("#title").type(company);
    cy.get("#email2").type(email);
    cy.get("#password2").type(password);
    cy.contains(element).click();
   
});
