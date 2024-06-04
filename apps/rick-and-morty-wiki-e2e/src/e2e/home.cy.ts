describe('rick-and-morty-wiki-home', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/character?page=1').as('getInitialCharacters');
    cy.intercept('GET', '/api/location?page=1').as('getInitialLocations');
    cy.visit('/');
  });

  it('should request service characters in initial load', () => {
    cy.wait('@getInitialCharacters').its('response.statusCode').should('eq', 200);
  })

  it('should request service locations in initial load', () => {
    cy.wait('@getInitialLocations').its('response.statusCode').should('eq', 200);
  })

  it('should display title welcome site rick', () => {
    cy.get('[data-cy="home-welcomer"]').contains(' Find out everything in one place')	
  });

  it('should display 8 cards with characters', () => {
    cy.get('[data-cy="card-character"]').should('have.length', 8);	
  })

  it('should display 10 cards with locations', () => {
    cy.get('[data-cy="card-locations"]').should('have.length', 10);	
  })

  it('should display in every card have image', () => {
    cy.get('[data-cy="card-image"]').should('have.length', 8);	
  })

  it('should display in every card have title character', () => {
    cy.get('[data-cy="card-title"]').should('have.length', 8);	
  })

  it('should display in every card have location', () => {
    cy.get('[data-cy="card-location"]').should('have.length', 8);	
  })

  it('should redirect to character info when click by name', () => {
    cy.get('[data-cy="card-title"]').first().click()
    
    cy.url().should('include', '/personagem/1')
  })
});
