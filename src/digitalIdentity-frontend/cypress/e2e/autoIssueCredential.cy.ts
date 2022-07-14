import { contains } from 'cypress/types/jquery';

describe('DI Connection specs', () => {
  it('create and delete new DI', () => {
    let proofTemplateName = 'ProofTemplate-Test-AutoLinking';
    let proofTemplateVersion = '42';

    cy.visit('http://localhost:4200');

    cy.get('nav').contains('Proof Template').click();
    cy.contains('Create new proof template').click();

    cy.url().should('include', 'create-proofTemplate');

    cy.get('nav').contains('Proof Template').click({ force: true });

    // ===========================
    // step 1
    // ===========================

    cy.get('.content').contains('Next').should('be.disabled');

    // enter name
    cy.get('#input-proof-template-name')
      .type(proofTemplateName)
      .should('have.value', proofTemplateName);
    cy.get('.content').contains('Next').should('be.disabled');

    cy.get('#input-proof-template-version')
      .type(proofTemplateVersion)
      .should('have.value', proofTemplateVersion);
    cy.get('.content').contains('Next').should('be.enabled');

    cy.get('.content').contains('Next').click();
    cy.wait(400);

    // ===========================
    // step 2
    // ===========================
    // mind: each expended row is in the dom even though it is not visible

    let count = 0;
    cy.get('mat-row').then(($elements) => {
      count = $elements.length;
    });

    let secondToLast = count - 1 - 4;
    toggleSelectRow(secondToLast);

    // got to next page

    cy.get('.mat-horizontal-stepper-content')
      .eq(1)
      .contains('Next')
      .should('be.enabled');
    cy.get('.mat-horizontal-stepper-content').eq(1).contains('Next').click();

    // ===========================
    // step 3
    // ===========================

    cy.get('app-cpt-step3').within(() => {
      cy.get('.mat-checkbox').click();
    });
    cy.get('.mat-horizontal-stepper-content')
      .eq(2)
      .contains('Next')
      .should('be.enabled');
    cy.get('.mat-horizontal-stepper-content').eq(2).contains('Next').click();

    // ===========================
    // step 3b
    // ===========================

    cy.get('app-cpt-step3b').within(() => {
      cy.get('input')
        .eq(0)
        .type('autoIssueFinal')
        .should('have.value', 'autoIssueFinal');
      cy.get('.mat-form-field-type-mat-select').click();
    });
    cy.get('.cdk-overlay-container').contains('AutoIssueFinal').click();

    cy.get('.mat-horizontal-stepper-content')
      .eq(3)
      .within(() => {
        cy.contains('Next').should('be.enabled');
        cy.contains('Next').click();
      });

    // TODO
  });

  function getRow(row: number) {
    return cy.get('mat-row').eq(row + 1);
  }

  function toggleSelectRow(row: number) {
    getRow(row).within(() => {
      cy.get('.mat-checkbox').click();
    });
  }
});
