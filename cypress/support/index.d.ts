/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
     /**
     * Select an option from a dropdown (native <select>)
     * @param selector The selector for the dropdown element
     * @param metricName The option's value or visible text
     */
    selectMetric(selector: string, metricName: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}