import faker from 'faker';

const baseUrl = Cypress.config().baseUrl 
const testSuiteName = 'Auth'

let email = ''
let name = ''
let password = ''
let registerFields = {}

beforeEach(() => {
  email = faker.internet.email()
  name = faker.name.findName()
  password = 'any_password'
  
  registerFields = {
   name,
   email, 
   password
  }
  })
  
describe(`${testSuiteName} Tests`, () => {

   // Register -----------------------------------
  const fillRegisterFields = () => {
    cy.get('[data-cy=name]').type(name).should('have.value', name);
    cy.get('[data-cy=email]').type(email).should('have.value', email);
    cy.get('[data-cy=password]').type(password).should('have.value', password);
  }
  const execRegister = () => {
    cy.get('[data-cy=register]').click();
    cy.wait(500)
  }

  const register = () => {
    cy.visit('/register');
    fillRegisterFields()
    execRegister()
  }

  
  // General
  const visitNavLink = (link) => {   
    cy.log(`Should visit ${link} if the link is found in the navbar`) 
    cy.get("a[href]")    
    .each($el => {    
      if($el.attr('href') === link){         
      cy.wrap($el.attr('href'), {log:false}).visit(link)    
      return false   
      }
    })    
  }

  describe(`${testSuiteName}: Register`, () => {
  it('should register a new user', () => {
    register()

    cy.url().should('equal', baseUrl + '/')
  });
  it.only('should not register if any field validation fails', async () => {
    cy.visit('/register');
    // Add initial data
    fillRegisterFields ()
    // clear one field per time and submit
    Object.entries(registerFields).map(async (item) => {
     const key = item[0]
     const value = item[1]
    cy.get(`[data-cy=${key}]`).clear().should('have.value', '');
    execRegister()
    cy.url().should('equal', baseUrl + '/register')    
    cy.get('div .alert-danger').contains(key, { matchCase: false }).contains('required')
    cy.get(`[data-cy=${key}]`).type(value).should('have.value', value);
    })  
    
    cy.url().should('equal', baseUrl + '/register')
  })
  it('should not register if the email is already in use', async () => {
    register()    
    cy.url().should('equal', baseUrl + '/') 
    
    register()    
    cy.url().should('equal', baseUrl + '/register')    
    cy.get('div .alert-danger').contains('User already registered')  
  })
  it('should redirect to the base URL if someone tries to access /register while loged in', () => {    
    cy.auth_login()
    cy.url().should('equal', baseUrl + '/')
    
    cy.visit('/register');
    cy.url().should('equal', baseUrl + '/')
  });
});


describe(`${testSuiteName}: Login`, () => {

  it('should log a user and show the profile link in the navbar', () => {     
    cy.auth_login()
    cy.url().should('equal', baseUrl + '/')
    
    const link = '/profile'
    visitNavLink(link)      
    cy.url().should('equal', baseUrl + link)
  });
  it('should redirect to the base URL if someone tries to access /login while loged in', () => {
    cy.auth_login()
    cy.url().should('equal', baseUrl + '/')
    
    cy.visit('/login');
    cy.url().should('equal', baseUrl + '/')
  });
})
describe(`${testSuiteName}: Logout`, () => {

  it('should logout the current loged user', () => {
    const link = '/logout'

    cy.auth_login()
    cy.url().should('equal', baseUrl + '/')

    visitNavLink(link)
    cy.url().should('equal', baseUrl + '/#')
  });
})
}); // Main


// Login -----------------------------------
// const fillLoginFields = () => {   
//   email = 'any_email5@mail.com'
//   password = 'any_password'
//   cy.get('[data-cy=email]').type(email).should('have.value', email);
//   cy.get('[data-cy=password]').type(password).should('have.value', password);
// }
// const execLogin = () => {
//   cy.get('[data-cy=login]').click();
//   cy.wait(500)
// }  
// const login = (link) => {
//   cy.visit('/login');
//   fillLoginFields()
//   execLogin()
// }