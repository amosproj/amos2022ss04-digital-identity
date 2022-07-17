describe('DI Connection specs', () => {
  it('create and delete new DI', () => {
    cy.visit('http://localhost:4200/');

    cy.get('nav').contains('Digital Identity').click();
    cy.contains('Create new Digital Identity').click();

    cy.url().should('include', 'create-new-DI');

    cy.get('nav').contains('Digital Identity').click({ force: true });

    cy.get('.content').contains('Register').should('be.disabled');

    // enter name
    cy.get('#input-name')
      .type('Jonas', { force: true })
      .should('have.value', 'Jonas');
    cy.get('.content').contains('Register').should('be.disabled');

    // enter surname
    cy.get('#input-surname')
      .type('Lancelord')
      .should('have.value', 'Lancelord');
    cy.get('.content').contains('Register').should('be.disabled');

    // enter mail
    cy.get('#input-email')
      .type('test@org.de')
      .should('have.value', 'test@org.de');
    cy.get('.content').contains('Register').should('be.enabled');

    // check HR-employee
    cy.get('mat-checkbox').click(5, 5);

    cy.get('.content').contains('Register').click();
    cy.wait(2000);

    cy.contains('Creating of DI was successful');
    cy.contains('Aye').click();

    // ===========================
    // delete
    // ===========================
    cy.get('nav').contains('Digital Identity').click();
    cy.contains('Overview of Digital Identities').click();

    cy.url().should('include', 'DI-Overview');

    cy.get('nav').contains('Digital Identity').click({ force: true });

    // click on delete
    cy.get('mat-row')
      .first()
      .within(() => {
        cy.get('.mat-column-Delete').within(() => {
          cy.get('button').click();
        });
      });

    cy.get('.mat-dialog-actions').contains('Yes').should('be.disabled');
    cy.get('mat-dialog-container').contains('Yes, I am sure!').click();
    cy.get('.mat-dialog-actions').contains('Yes').should('be.enabled');
    cy.get('.mat-dialog-actions').contains('No').click();

    // click on delete
    cy.get('mat-row')
      .first()
      .within(() => {
        cy.get('.mat-column-Delete').within(() => {
          cy.get('button').click();
        });
      });

    cy.get('.mat-dialog-actions').contains('Yes').should('be.disabled');
    cy.get('mat-dialog-container').contains('Yes, I am sure!').click();
    cy.get('.mat-dialog-actions').contains('Yes').click();

    cy.wait(2000);
  });
});
