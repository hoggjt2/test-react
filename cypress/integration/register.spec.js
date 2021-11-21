beforeEach(() => {
    /**
     * In your Project 2: React CRUD, you may want to use your 
     * Heroku application's URL. You can change it after you 
     * have figured out how to deploy your React application
     * to Heroku.
     */
    cy.visit('localhost:3000/register'); 
});

// The description of the test
it('register a new user', () => {
    cy.get('.nav-link').contains('Register'); // The nav link text contains "Register"
    cy.get('input[name="name"]').type('test'); // Find the input with the name "name", then type a value
    cy.get('input[name="email"]').type('test@gmail.com'); // Find the input with the name "email", then type a value
    cy.get('input[name="password"]').type('pass'); // Find the input with the name "password", then type a value
    cy.get('input[name="password_confirmation"]').type('pass'); // Find the input with the name "password_confirmation", then type a value
    cy.get('.btn.btn-secondary').click(); // Find the element with the class .btn.btn-secondary, then click it
    cy.wait(3000);// Wait for page to load
    cy.get('.alert').contains('New User Registered.');// Confirm registration

    //Attempt to enter same credentials
    cy.get('.btn.btn-secondary').click(); // Find the element with the class .btn.btn-secondary, then click it
    cy.wait(3000);// Wait for page to load
    cy.get('.alert').contains('Cannot process credentials.');// Confirm registration
});