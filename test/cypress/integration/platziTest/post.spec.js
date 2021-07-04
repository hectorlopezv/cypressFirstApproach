"use strict";

describe("pruebas de posts", function() {
  before(function() {
    cy.visit("/login");
    cy.fixture("user").as("user_data");
    cy.exec("npm run test:clean");

    cy.server();
    cy.route(
      "POST",
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD_sXWcodF9-oW8aFknYMHM7ysb7nZuRS0"
    ).as("registerUser");
    cy.get("@user_data").then(function(user) {
      //cargamos el fixture esto es asynchrono
      cy.AddUser(
        user.nombre,
        user.company,
        user.email,
        user.password,
        "Registrarse"
      );
      cy.wait("@registerUser");
    });
  });

  it("debe crear un post", function() {
    cy.get("@user_data").then(function(user) {
      cy.get("textarea").type(Cypress.env("postContent"));
      cy.contains("button", "Crear").as("botonCrear");
      cy.get("@botonCrear").should("be.enabled");
      cy.get("@botonCrear").click();
      cy.contains(".col2 h5", user.name).sholud("be.visible");
      cy.contains("p",Cypress.env("postContent")).sholud("be.visible");
    });
  });
});
