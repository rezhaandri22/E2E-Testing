describe("Login Page Test Case", () => {
    beforeEach(() => {
        // Visit the login page before each test case
        cy.visit("http://localhost:3000");
      });
    
      it("Should have correct title and greeting", () => {
        cy.title().should("eq", "React Gallery");
        cy.contains("Hello Again").should("exist");
      });

    it("Contains Email and Password Input, and Login Button", () =>{
        const email = cy.get("input[name='email']")
        email.should("be.visible")
        email.should("have.attr", "type", "email")
        email.should("have.attr", "placeholder", "Email Address");

        const password = cy.get("input[name='password']")
        password.should("be.visible")
        password.should("have.attr", "type", "password")
        password.should("have.attr", "placeholder", "Password");

        const button = cy.get("button");
        button.should("be.visible");
        button.contains("Login");
        button.should("have.css", "background-color", "rgb(79, 70, 229)")
        button.should("have.css", "color", "rgb(255, 255, 255)");

    });

    it("Do Login with null value", () =>{
      const button = cy.get("button");
      button.click();
      cy.on ("Window:alert", (text) =>{
        expect(text).to.contains("login failed");
      })
    })

    it("Do Login with worng values", () => {
      const email = cy.get("input[name='email']");
      email.type("wrong@react.test");

      const password = cy.get("input[name='password'");
      password.type("password");

      const button = cy.get("button");
      button.click();

      cy.on("window:alert", (text) => {
        expect(text).to.contains("login failed");
      })
    })
    it("Do Login with correct values", () => {
      const email = cy.get("input[name='email']");
      email.type("user@react.test");

      const password = cy.get("input[name='password'");
      password.type("password");

      const button = cy.get("button");
      button.click();

      cy.on("window:alert", (text) => {
        expect(text).to.contains("welcome");
      })

      cy.url().should("eq", "http://localhost:3000/dashboard");
    })

});
