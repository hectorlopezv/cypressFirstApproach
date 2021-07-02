describe("Cy Visit", function() {
  it("test visit method", function() {
    cy.visit("/login");
  });

  it("debe registrar un nuevi usuario", function() {
    cy.server();
    cy.route("POST",
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD_sXWcodF9-oW8aFknYMHM7ysb7nZuRS0"
    ).as("registerUser");

    cy.contains("Crear una cuenta").click();
    cy.get("#name").type("nombre de prueba hector");
    cy.get("#title").type("prueba compania");
    cy.get("#email2").type("pruebacypress@gmail.com");
    cy.get("#password2").type("lamierda2");
    cy.contains("Registrarse").click();
    cy.wait("@registerUser");
  });
});
