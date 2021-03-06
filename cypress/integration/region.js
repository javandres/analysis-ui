describe('Set up a new region', function () {
  before(function () {
    cy.login()
  })

  it('open "new region" page', function () {
    cy.visit('/')
    cy.contains('Set up a new region').click()
    // has form
    cy.get('input[name="Region Name"]').type('Cypress - Region Name')
  })

  it('search for map location by name', function () {
    cy.visit('/regions/create')
    cy.mapIsReady()
    // try searching all selected regions
    return cy.fixture('regions.json').then((JSON) => {
      cy.wrap(JSON.regions).each((region) => {
        cy.get('input#react-select-2-input')
          .focus()
          .clear()
          .type(region.searchTerm)
        cy.contains(region.foundName).click({force: true})
        cy.screenshot(region.searchTerm + '-search-result.png')
      })
    })
  })

  it('enter valid and invalid coordinates', () => {
    cy.visit('/regions/create')
    // coordinate inputs must be valid
    // TODO not finished
    cy.get('#north-bound').clear().type(45.769)
    cy.get('button[name="Set up a new region"]').should('have.attr', 'disabled')
  })
})
