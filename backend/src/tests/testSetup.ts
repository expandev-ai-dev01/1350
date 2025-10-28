/**
 * @summary
 * Global test environment setup
 *
 * @module tests/testSetup
 *
 * @description
 * Configures the test environment for all test files
 * Sets up global test utilities and configurations
 */

/**
 * @summary
 * Test environment configuration
 */
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';

/**
 * @summary
 * Global test timeout
 */
jest.setTimeout(10000);

/**
 * @summary
 * Setup runs before all tests
 */
beforeAll(() => {
  console.log('Starting test suite...');
});

/**
 * @summary
 * Cleanup runs after all tests
 */
afterAll(() => {
  console.log('Test suite completed');
});
