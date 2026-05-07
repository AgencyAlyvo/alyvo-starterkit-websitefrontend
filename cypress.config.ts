import { defineConfig } from 'cypress'
import fs from 'fs'

export default defineConfig({
  env: {},
  includeShadowDom: true,
  watchForFileChanges: true,
  videoCompression: true,
  video: true,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'tests/e2e/test-reports',
    reportFilename: 'index.html',
    overwrite: true,
    html: true,
    json: false,
  },
  e2e: {
    specPattern: 'tests/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    baseUrl: 'http://localhost:1461',
    /**
     *
     * @param on
     * @param config
     */
    setupNodeEvents(on, config) {
      on(
        'after:spec',
        // Permet de garder seulement les videos des tests qui ont échoué ou qui ont été relancés
        (spec: Cypress.Spec, results: CypressCommandLine.RunResult) => {
          if (results && results.video) {
            // Do we have failures for any retry attempts?
            const failures: boolean = results.tests.some((test: CypressCommandLine.TestResult): boolean =>
              test.attempts.some((attempt: CypressCommandLine.AttemptResult) => attempt.state === 'failed'),
            )
            if (!failures) {
              // delete the video if the spec passed and no tests retried
              fs.unlinkSync(results.video)
            }
          }
        },
      )
    },
  },
})
