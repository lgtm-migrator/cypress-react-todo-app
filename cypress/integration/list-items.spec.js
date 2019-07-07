describe('List items', () => {
  beforeEach(() => {
    cy.seedAndVisit();
  });

  it('Properly displays completed items', () => {
    cy.get('.todo-list li')
      .filter('.completed')
      .should('have.length', 1)
      .and('contain', 'Eggs')
      .find('#todo')
      .should('be.checked');
  });

  it('Shows remaining todos in the footer', () => {
    cy.get('.todo-count').should('contain', 3);
  });

  it.only('Removes a todo', () => {
    cy.route({
      url: '/api/todos/1',
      method: 'DELETE',
      status: 200,
      response: {},
    });

    cy.get('.todo-list li').as('list');

    cy.get('@list')
      .find('.destroy')
      .first()
      .invoke('show')
      .click();

    cy.get('@list')
      .should('have.length', 3)
      .and('not.contain', 'Milk');
  });
});