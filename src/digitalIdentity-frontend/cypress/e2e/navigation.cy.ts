describe('Navigation specs', () => {
  it('visit home', () => {
    cy.visit('http://localhost:4200/');
  });

  it('navigate DI Overview', () => {
    cy.visit('http://localhost:4200/');

    cy.get('nav').contains('Digital Identity').click();
    cy.contains('Overview of Digital Identities').click();

    cy.url().should('include', 'DI-Overview');
  });

  it('navigate DI Create', () => {
    cy.visit('http://localhost:4200/');

    cy.get('nav').contains('Digital Identity').click();
    cy.contains('Create new Digital Identity').click();

    cy.url().should('include', 'create-new-DI');
  });

  it('navigate DI Create', () => {
    cy.visit('http://localhost:4200/');

    cy.get('nav').contains('Digital Identity').click();
    cy.contains('Create new Digital Identity').click();

    cy.url().should('include', 'create-new-DI');
  });
});
