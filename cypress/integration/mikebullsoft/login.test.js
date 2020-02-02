describe('Able to log in', function() {
  it('Logs in', function() {
    cy.visit('http://localhost:3000');
    cy.get('input[type=text]').type('test@test.com');
    cy.get('input[type=password]').type('test');
    cy.get('button.ui.large.fluid.button').click();
    cy.get(
      '#root > div > div.ui.vertical.left.fixed.menu > div:nth-child(2) > div > div:nth-child(1) > div'
    ).should('contain', 'Cypress Tester');
  });
});
