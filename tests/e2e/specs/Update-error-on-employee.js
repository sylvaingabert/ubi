describe('Opération de mise à jour', () => {
  it("Erreur lors de la sauvegarde d'un employé", () => {
    cy.server();
    cy.route('GET', 'api/v1/employees', 'fixture:employees.json');
    cy.route('GET', 'api/v1/employee/5', 'fixture:employee-5.json');
    cy.route({
      method: 'PUT',
      status: 429,
      url: 'api/v1/update/5',
      response: 'fixture:employee-5-update-error.json',
    });

    cy.visit('/');
    cy.get('[data-testid="link"]').first().click();
    cy.get('[data-testid="savebtn"]').click();
    cy.get('.vue-dialog-content').should('contain', "Une erreur s'est produite lors de la sauvegarde des données.");
  });
});
