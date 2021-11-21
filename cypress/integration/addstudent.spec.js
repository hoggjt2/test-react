beforeEach(() => {
    /**
     * In your Project 2: React CRUD, you may want to use your 
     * Heroku application's URL. You can change it after you 
     * have figured out how to deploy your React application
     * to Heroku.
     */
     cy.visit('localhost:3000/login');
     cy.get('.nav-link').contains('Login'); // The nav link text contains "Login"
     cy.get('input[name="email"]').type('admin@gmail.com'); // Find the input with the name "email", then type a value
     cy.get('input[name="password"]').type('pass'); // Find the input with the name "password", then type a value
     cy.get('.btn.btn-secondary').click(); // Find the element with the class .btn.btn-secondary, then click it
     cy.wait(3000);// Wait for page to load

    cy.visit('localhost:3000/students'); 
});

// The description of the test
it('add a new student', () => {
    cy.get('.btn').contains('Add Student').click();
    cy.get('input[name="first_name"]').type('john'); // Find the input with the name "name", then type a value
    cy.get('input[name="last_name"]').type('doe');
    cy.get('input[name="email"]').type('example@gmail.com'); // Find the input with the name "email", then type a value
    cy.get('input[name="dob"]').type('10-10-1990');
    cy.get('input[name="institution_id"]').type('1');
    cy.get('.btn.btn-secondary').click(); // Find the element with the class .btn.btn-secondary, then click it
    cy.wait(3000);// Wait for page to load
});