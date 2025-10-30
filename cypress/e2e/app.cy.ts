/// <reference types="cypress" />

describe('KPI Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('h1').contains('Network KPI Dashboard')
    cy.get('canvas').should('be.visible')
  })

  it('renders and switches metric', () => {

    const metrics: string[] = ['Latency', 'Download', 'Upload']
    let dataPoints: any = [];

    metrics.forEach((metric) => {
      cy.intercept(`GET`, `/api/metrics?metric=${metric.toLowerCase()}`, (req) => {
        req.headers[`Cache-Control`] = `no-cache`;
      }).as(metric.toLowerCase())
      cy.selectMetric('#metric', metric)
      cy.wait(`@${metric.toLowerCase()}`).then(({ response }) => {
        expect(response).to.exist;
        expect(response?.statusCode).to.eq(200);
        expect(response?.body).to.have.property(`metric`, metric.toLowerCase())
        const newDataPoints = JSON.stringify(response?.body.points)
        expect(newDataPoints).not.eq(dataPoints)
        dataPoints = newDataPoints
      })
    })

  })

  it('retries upload metric REST request after fail', () => {

    cy.intercept(`GET`, `/api/metrics?metric=upload`, (req) => {
      req.headers[`Cache-Control`] = `no-cache`;
      req.continue((res) => {
        res.statusCode = 500
      })
    }).as('upload-fail')
    cy.intercept(`GET`, `/api/metrics?metric=upload`).as('upload-retried')

    cy.selectMetric('#metric', 'Upload')

    cy.wait('@upload-fail').then(({ response }) => {
      expect(response?.statusCode).to.eq(500);
    })
    cy.wait('@upload-retried').then(({ response }) => {
      expect(response?.statusCode).to.eq(200);

    })
  })

  it('should not execute an HTML script', () => {
    cy.intercept('GET', '/api/metrics?metric=upload', {
      statusCode: 200,
      body: {
        description: '<img src=x onerror=alert("XSS")>',
        points: [{ v: 1 }, { v: 2 }],
      },
    }).as('get-metric');

    cy.visit('/');

    cy.get('#metric').select('Upload')
    cy.wait('@get-metric');

    cy.get('#desc')
      .should('be.visible')
      .and('contain.text', '<img src=x onerror=alert("XSS")>')
      .and('not.contain.html', '<img');
  });
})