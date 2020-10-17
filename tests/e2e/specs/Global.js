describe("Parcours global de l'application", () => {
  it('Ne doit produire aucune erreur', () => {
    cy.server();
    cy.route('GET', 'api/v1/employees', 'fixture:employees.json');
    cy.route('GET', 'api/v1/employee/19', 'fixture:employee-19.json');
    cy.route('PUT', 'api/v1/update/19', 'fixture:update-19.json');
    cy.route('DELETE', 'api/v1/delete/5', 'fixture:delete-5.json');
    cy.route('GET', 'api/v1/employee/1', 'fixture:employee-1.json');
    cy.route('GET', 'api/v1/employee/5', 'fixture:employee-5.json');
    cy.route('POST', 'api/v1/create', 'fixture:employee-create.json');

    cy.visit('/');
    cy.get('[data-testid="title"]').should('contain', 'Liste des salariés');
    cy.get('[data-testid="total"]').should('contain', '24');
    cy.get('[data-testid="list"]').children().should('have.length', 10);
    cy.get('[data-testid="link"]').eq(2).click();

    cy.get('[data-testid="id"]').should('have.value', '19');
    cy.get('[data-testid="name"]').should('have.value', 'Bradley Greer');
    cy.get('[data-testid="salary"]').should('have.value', '132000');
    cy.get('[data-testid="age"]').should('have.value', '41');
    cy.get('[data-testid="age"]').clear().type('25');
    cy.get('[data-testid="savebtn"]').click();
    cy.get('[data-testid="age"]').should('have.value', '25');

    cy.get('[data-testid="back"]').click();
    cy.get('[data-testid="link"]').first().click();
    cy.get('[data-testid="deletebtn"]').click();
    cy.get('.vue-dialog-button').eq(1).click();

    cy.url().should('include', '/');
    cy.get('[data-testid="total"]').should('contain', '23');

    cy.get('[data-testid="pagination"]').children().should('have.length', 5);
    cy.get('[data-testid="pagination"]').children().eq(3).click();
    cy.url().should('include', '/3');
    cy.get('[data-testid="list"]').children().should('have.length', 3);

    cy.get('[data-testid="pagination"]').children().eq(4).click();
    cy.get('[data-testid="search"]').type('tiger');
    cy.get('[data-testid="searchbtn"]').click();
    cy.url().should('include', '/1/tiger');
    cy.get('[data-testid="link"]').first().click();
    cy.get('[data-testid="name"]').should('have.value', 'Tiger Nixon');

    cy.get('[data-testid="back"]').click();
    cy.get('[data-testid="createbtn"]').click();
    cy.get('[data-testid="salary"]').clear().type('9999');
    cy.get('[data-testid="age"]').clear().type('47');
    cy.get('[data-testid="profileimage"]').type('https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Commissioner-James-Gordon.jpg/220px-Commissioner-James-Gordon.jpg');
    cy.get('[data-testid="name"]').type('Jim Gordon');
    cy.get('[data-testid="savebtn"]').click();
    cy.get('.vue-dialog-content').should('contain', "L'employé a bien été créé");
    cy.get('.vue-dialog-button').first().click();

    cy.get('[data-testid="total"]').should('contain', '24');

    cy.get('[data-testid="search"]').type('jim gordon');
    cy.get('[data-testid="searchbtn"]').click();
    cy.get('[data-testid="link"]').first().click();

    cy.get('[data-testid="name"]').should('have.value', 'Jim Gordon');
    cy.get('[data-testid="salary"]').should('have.value', '9999');
    cy.get('[data-testid="age"]').should('have.value', '47');
  });
});
