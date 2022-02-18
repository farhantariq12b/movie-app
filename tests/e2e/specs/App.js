
describe('Movie App', () => {
  
  it('Visit App and check search is working correctly', () => {
    cy.visit('/')
    cy.get('input').type('Home{enter}')
    cy.wait(1000);
    cy.get(':nth-child(1) > .max-w-md > .px-6 > [data-testid=title]').should(
      "contain.text",
      "Harry Comes Home"
    );
  })

  it('Visit App and check pagination is working correctly', () => {
    cy.visit('/')
    cy.wait(1000);
    cy.get(':nth-child(4) > .rounded-sm').trigger('click')
    cy.wait(1000);
    cy.get(':nth-child(1) > .max-w-md > .px-6 > [data-testid=title]').should(
      "contain.text",
      "Deep Waterworld"
    );
  })
})
