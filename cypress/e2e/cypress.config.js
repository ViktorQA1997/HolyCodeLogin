// Import the defineConfig helper from Cypress
const { defineConfig } = require('cypress');

// Export Cypress configuration using defineConfig for better IntelliSense and type checking
module.exports = defineConfig({
  e2e: {
    // Base URL for all tests – you can use cy.visit('/en/login') instead of the full URL
    baseUrl: 'https://st.storabble.etondigital.com',

    // Set the default timeout for Cypress commands (e.g., cy.get) to 8000ms (8 seconds)
    defaultCommandTimeout: 8000,

    // Disable video recording of test runs
    video: false,
  },
});
