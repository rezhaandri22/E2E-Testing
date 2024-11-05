describe("Dashboard Page Test Cases", () => {
    beforeEach(() => {
        // Mengunjungi halaman login
        cy.visit("http://localhost:3000");
        
        // Mengisi email dan password
        cy.get("input[name='email']").type("user@react.test");
        cy.get("input[name='password']").type("password");

        // Mengklik tombol login
        cy.get("button").click();
    });

    it("Do Login with correct values", () => {
        // Mengatur pendengar untuk alert setelah tombol login diklik
        cy.on("window:alert", (text) => {
            expect(text).to.contain("welcome"); // Memastikan alert berisi "welcome"
        });

        // Memverifikasi URL setelah login
        cy.url().should("eq", "http://localhost:3000/dashboard");
    });

    it("Found No Post For The First Time", () => {
        cy.contains("Found 0 photos");
    });

    it("Contains Image url and description input, and Publish button", () => {
        const image = cy.get("input[name='image']");
        image.should("be.visible");
        image.should("have.attr", "type", "url");
        image.should("have.attr", "required", "required");
        image.should("have.attr", "placeholder", "Image URL");

        const description = cy.get("input[name='desc']");
        description.should("be.visible");
        description.should("have.attr", "type", "text");
        description.should("have.attr", "required", "required");
        description.should("have.attr", "placeholder", "What's on your mind?");

        const button = cy.get("button");
        button.should("be.visible");
        button.contains("Publish");
        button.should("have.css", "background-color", "rgb(79, 70, 229)");
        button.should("have.css", "color", "rgb(255, 255, 255)");
    });

    it("Upload Some Photos", () => {
        const photos = [
            {
                imageValue: "https://images.unsplash.com/photo-1657030391597-a02cad4ec92c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
                descriptionValue: "Image 1: Lorem Ipsum",
            },
            {
                imageValue: "https://images.unsplash.com/photo-1657028310103-f53dd49a856a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
                descriptionValue: "Image 2: Lorem Ipsum",
            },
        ];

        photos.forEach(({ imageValue, descriptionValue }) => {
            const image = cy.get("input[name='image']");
            image.type(imageValue);

            const description = cy.get("input[name='desc']");
            description.type(descriptionValue);

            const button = cy.get("button");
            button.click();

            cy.get("img").should("have.attr", "src", imageValue);
            cy.contains(descriptionValue);
        });
    });
});
