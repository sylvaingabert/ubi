describe("Opération de suppression d'un employé", () => {
  it("Erreur lors de la suppression d'un employé", () => {
    cy.server();
    cy.route('GET', 'api/v1/employees', 'fixture:employees.json');
    cy.route('GET', 'api/v1/employee/5', 'fixture:employee-5.json');
    cy.route({
      method: 'DELETE',
      status: 429,
      url: 'api/v1/delete/5',
      response: 'fixture:employee-5-delete-error.json',
    });

    cy.visit('/');
    cy.get('[data-testid="link"]').first().click();
    cy.get('[data-testid="deletebtn"]').click();
    cy.get('.vue-dialog-button').eq(1).click();
    cy.get('.vue-dialog-content').should('contain', "Une erreur s'est produite lors de la suppression des données.");
  });
});
