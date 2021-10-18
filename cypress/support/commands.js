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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('auth_login', (email='any_email5@mail.com', password='any_password' ) => {
    cy.visit('/login');
    
    if(email === ''){
    cy.get('[data-cy=email]').clear().should('have.value', email);
    }else{
    cy.get('[data-cy=email]').type(email).should('have.value', email);
    }
    if(password=== ''){
     cy.get('[data-cy=password]').clear().should('have.value', password);
     }else{
     cy.get('[data-cy=password]').type(password).should('have.value', password);
     }   
  
    cy.get('[data-cy=login]').click();
    cy.wait(500)
})