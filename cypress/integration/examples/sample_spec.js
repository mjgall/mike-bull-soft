describe('My First Test', function() {
  it('Visits the Kitchen Sink', function() {
    cy.setCookie('ZXhwcmVzczpzZXNz', 'eyJwYXNzcG9ydCI6eyJ1c2VyIjo3fX0')

    cy.visit('http://localhost:3000');
  });
});
