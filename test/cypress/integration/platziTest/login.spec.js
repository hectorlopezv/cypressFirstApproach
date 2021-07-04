describe("Cy Visit", function() {
  before(function() {
    cy.exec("npm run test:clean");
  });

  beforeEach(function() {
    cy.fixture("user").as("user_data"); //carga info del fixture
    cy.visit("/login");
    cy.contains("h1", "Bienvenido").should("be.visible");
  });
  after(function() {
    cy.log("test done");
  });

  it("debe registrar un nuevi usuario", function() {
    Cypress.on("uncaught:exception", function(err, runnable) {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
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
      cy.get(".error-msg").should("not.exist");
      cy.screenshot('create-user-1');
    });
  });

  it("debe registrar un nuevi usuario", function() {
    cy.server();
    cy.route(
      "POST",
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD_sXWcodF9-oW8aFknYMHM7ysb7nZuRS0"
    ).as("registerUser");

    cy.contains("Crear una cuenta").click();
    cy.get("#name").type("test");
    cy.get("#title").type("test");
    cy.get("#email2").type("test@gmail.com");
    cy.get("#password2").type("lamierda2");
    cy.contains("Registrarse").click();
    cy.wait("@registerUser");
    cy.screenshot('create-user-2');
  });
  it("debe falllar con un usaurio que no existe al logear un usuario", function() {
    cy.LoginUser("fail@gmail.com", "lamierda2", "Ingresar"); //custom commands
    cy.get(".error-msg").should("be.visible");
    cy.screenshot('logian failed', {'blackout': ["#email1"]});
  });

  it("debe logear un usuario", function() {
    cy.LoginUser("test@gmail.com", "lamierda2", "Ingresar"); //custom commands
    cy.contains("a", "Dashboard").should("be.visible");
    cy.screenshot('create-user-3');
  });
});
