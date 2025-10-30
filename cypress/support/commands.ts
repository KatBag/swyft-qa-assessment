Cypress.Commands.add('selectMetric', (selector: string, metricName: string) => {
  cy.get(selector).select(metricName);
});