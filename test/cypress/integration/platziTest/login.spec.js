describe("Cy Visit", function() {
  beforeEach(function () {
    cy.visit("/login");
    cy.contains('h1',"Bienvenido").should('be.visible');
  })
  after(function () {
    cy.log("test done")
    
  })


  it.skip("debe registrar un nuevi usuario", function() {
    Cypress.on('uncaught:exception', function(err, runnable) {
      // returning false here prevents Cypress from
      // failing the test
      return false
  })
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
    cy.get('.error-msg').should('not.exist');
  });


  it("debe registrar un nuevi usuario", function() {

    cy.server();
    cy.route("POST",
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD_sXWcodF9-oW8aFknYMHM7ysb7nZuRS0"
    ).as("registerUser");

    cy.contains("Crear una cuenta").click();
    cy.get("#name").type("test");
    cy.get("#title").type("test");
    cy.get("#email2").type("test@gmail.com");
    cy.get("#password2").type("lamierda2");
    cy.contains("Registrarse").click();
    cy.wait("@registerUser");
  });
  it("debe falllar con un usaurio que no existe al logear un usuario", function() {
    


    cy.get("#email1").type("fail@gmail.com");
    cy.get("#password1").type("lamierda2");
    cy.contains("Ingresar").click();
    cy.wait(3000)
    cy.get('.error-msg').should('be.visible');

  });

  it("debe logear un usuario", function() {



    cy.get("#email1").type("test@gmail.com");
    cy.get("#password1").type("lamierda2");
    cy.contains("Ingresar").click();
    cy.contains('a', "Dashboard").should("be.visible");

  });

});
