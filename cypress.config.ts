
import { defineConfig } from 'cypress'
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5174',
    video: false,
    retries: 1,
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) { },
  }
})
