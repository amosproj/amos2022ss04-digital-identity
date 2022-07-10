import { contains } from 'cypress/types/jquery';

describe('DI Connection specs', () => {
  it('create and delete new DI', () => {
    let proofTemplateName = 'ProofTemplate-Test-Creation-With-Predicates';
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

    cy.wait(300);
    cy.get('.content').contains('Next').click();
    cy.wait(300);

    // ===========================
    // step 2
    // ===========================
    // mind: each expended row is in the dom even though it is not visible

    // select first row and deselect secound attribut
    let i = 0;
    toggleSelectRow(i);
    toggleExpandRow(i);

    cy.wait(200);

    toggleSelectAttribute(i + 1, 1);

    // select secound row and deselect first attribut
    // and add filter to second attribute
    i = 2;
    toggleSelectRow(i);
    toggleExpandRow(i);
    toggleSelectAttribute(i + 1, 0);
    selectFilter(i + 1, 1, 'greater than');

    // select secound row and add all possible filters to each attribute
    i = 4;
    toggleSelectRow(i);
    toggleExpandRow(i);
    let filters = [
      'greater than',
      'greater equal than',
      'less than',
      'less equal than',
    ];
    for (let j = 0; j < filters.length; j++) {
      selectFilter(i + 1, j, filters[j]);
    }

    // got to next page

    cy.get('.mat-horizontal-stepper-content')
      .eq(1)
      .contains('Next')
      .should('be.enabled');
    cy.get('.mat-horizontal-stepper-content').eq(1).contains('Next').click();
    cy.wait(100);

    // ===========================
    // step 3
    // ===========================

    cy.get('.mat-horizontal-stepper-content').eq(2).contains('warning');
    cy.get('.mat-horizontal-stepper-content')
      .eq(2)
      .contains('Next')
      .should('be.enabled');
    cy.get('.mat-horizontal-stepper-content').eq(2).contains('Next').click();
    cy.wait(100);

    // ===========================
    // step 4
    // ===========================

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

  function toggleExpandRow(row: number) {
    getRow(row).within(() => {
      cy.contains('expand').click();
    });
    cy.wait(200);
  }

  function toggleSelectAttribute(row: number, i: number) {
    getRow(row).within(() => {
      cy.get('.mat-checkbox').eq(i).click();
    });
  }
  function selectFilter(row: number, i: number, filterText: string) {
    getRow(row).within(() => {
      cy.get('.mat-select').eq(i).click();
    });
    cy.get('.cdk-overlay-container').contains(filterText).click();
  }

  // select first attribute and close it
});
