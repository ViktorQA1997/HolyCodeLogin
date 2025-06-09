// Define a test suite for Storabble login functionality
describe('Storabble Login Tests', () => {
  
  // Set base URL for login page
  const baseUrl = 'https://st.storabble.etondigital.com/en/login';

  // Set valid credentials used for positive login tests
  const validEmail = 'viktor.kokeza@gmail.com';
  const validPass = 'TestPass123';

  // Basic HTTP authentication for accessing the test environment
  const auth = {
    username: 'storabble',
    password: 'ed2023',
  };

  // Reusable helper function to perform login with any email/password combo
  const performLogin = (email, password) => {
    cy.get('.btn-wrapper > :nth-child(1)').click(); // Click the initial login button to reveal form
    if (email !== undefined) cy.get('input[name="email"]').clear().type(email); // Fill in email field
    if (password !== undefined) cy.get('input[name="password"]').clear().type(password); // Fill in password field
    cy.get('button[type="submit"]').click(); // Click the submit/login button
  };

  // Before each test, visit the login page with HTTP basic auth
  beforeEach(() => {
    cy.visit(baseUrl, { auth });
  });

  // ✅ TC01: Positive test - valid login should redirect user to listings page
  it('TC01 - Valid login redirects to /en/listings', () => {
    performLogin(validEmail, validPass); // Use valid credentials
    cy.url().should('include', '/en/listings'); // Verify user is redirected to listings page
  });

  // ⚠️ TC02: Negative test - entering correct email and incorrect password
  it('TC02 - Invalid password shows error message', () => {
    performLogin(validEmail, 'wrongpassword'); // Use correct email but wrong password
    cy.get('form > :nth-child(3)').should('exist'); // Check if email error message exists
    cy.get('form > :nth-child(5)').should('exist'); // Check if password error message exists
  });

  // ✅ TC03: Invalid email format should show error messages
  it('TC03 - Invalid email format error message', () => {
    performLogin('viktor1234567@gmail.com', validPass); // Use invalid email
    cy.get('form > :nth-child(3)').should('exist'); // Email error should appear
    cy.get('form > :nth-child(5)').should('exist'); // Password error may also appear
  });

  // ✅ TC04: Empty form fields should trigger required field validation
  it('TC04 - Empty fields prevent submission', () => {
    performLogin('', ''); // Leave both fields empty
    cy.get('form > :nth-child(3)').should('exist'); // Email error
    cy.get('form > :nth-child(5)').should('exist'); // Password error
  });

  // ✅ TC05: Leave only password empty and check if proper validation is shown
  it('TC05 - Empty password error message', () => {
    performLogin(validEmail, ''); // Only email provided
    cy.get('form > :nth-child(5)').should('exist'); // Check for password error
  });

  // ✅ TC06: Leave only email empty and verify validation
  it('TC06 - Empty email error message', () => {
    performLogin('', validPass); // Only password provided
    cy.get('form > :nth-child(3)').should('exist'); // Check for email error
  });

  // ✅ TC07: Password field should be masked (type="password")
  it('TC07 - Password input should be masked', () => {
    performLogin(validEmail, validPass); // Fill login form
    cy.get('#password') // Get the password field by ID
      .should('have.prop', 'nodeName', 'INPUT') // Confirm it's an input field
      .and('have.attr', 'type', 'password'); // Confirm it's a masked field
  });

  // ❌ TC09: Logging out should redirect user to login page (but requires multiple clicks due to bug)
  it('TC09 - Logging out requires multiple clicks', () => {
    performLogin(validEmail, validPass); // Log in with valid credentials
    cy.wait(5000); // Wait for login to complete and page to fully load

    // Try logging out 3 times (due to bug)
    for (let i = 0; i < 3; i++) {
      cy.get('.c-menu__desk > .c-menu__right--user').click(); // Click on user menu
      cy.get('.show > :nth-child(4)').click(); // Click logout option
      cy.wait(3000); // Wait before trying again
    }

    cy.url().should('include', '/login'); // Verify redirection to login page
  });

  // ✅ TC10: Brute-force protection — simulate 50+ failed login attempts
  it('TC10 - Brute force: multiple invalid login attempts', () => {
    const invalidCredentials = [];

    // Generate 50 fake credential combinations
    for (let i = 1; i <= 50; i++) {
      invalidCredentials.push({
        email: `invalid_user${i}@test.com`,
        password: `wrongPass${i}`
      });
    }

    // Add edge-case combinations to test input validation
    invalidCredentials.push(
      { email: '', password: '' },
      { email: ' ', password: ' ' },
      { email: 'invalidemail.com', password: '123' },
      { email: 'test@.com', password: ' ' }
    );

    // Iterate through each set of credentials and test error handling
    invalidCredentials.forEach((cred, index) => {
      it(`Attempt ${index + 1}: ${cred.email} / ${cred.password}`, () => {
        cy.visit(baseUrl); // Reload login page for each attempt
        performLogin(cred.email, cred.password); // Attempt login with invalid credentials

        // Check if error message appears (adjust selector if needed)
        cy.get('.error-message')
          .should('be.visible')
          .and('contain', 'Invalid email or password');
      });
    });
  });

});
