beforeEach(() => {
    /**
     * In your Project 2: React CRUD, you may want to use your 
     * Heroku application's URL. You can change it after you 
     * have figured out how to deploy your React application
     * to Heroku.
     */
    cy.visit('localhost:3000/login'); 
});

// The description of the test
it('login a user with email and password', () => {
    cy.get('.nav-link').contains('Login'); // The nav link text contains "Login"
    cy.get('input[name="email"]').type('admin@gmail.com'); // Find the input with the name "email", then type a value
    cy.get('input[name="password"]').type('pass'); // Find the input with the name "password", then type a value
    cy.get('.btn.btn-secondary').click(); // Find the element with the class .btn.btn-secondary, then click it
    cy.wait(3000);// Wait for page to load
    cy.get('.nav-link').contains('Logout'); // The nav link text contains "Logout"
    cy.get('.nav-link').contains('Logout').click(); // Log the user out
});
