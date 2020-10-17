describe("Consultation d'une fiche employé", () => {
  it("Erreur lors de la récupération d'un employé", () => {
    cy.server();
    cy.route('GET', 'api/v1/employees', 'fixture:employees.json');
    cy.route({
      method: 'GET',
      status: 429,
      url: 'api/v1/employee/5',
      response: 'fixture:employee-5-fetch-error.json',
    });

    cy.visit('/employee/5');
    cy.get('.vue-dialog-content').should('contain', "Une erreur s'est produite lors de la récupération des données. Veuillez recharger la page.");
  });
});
