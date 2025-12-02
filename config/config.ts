/**
 * Application Configuration
 * Centralized configuration for API and app settings
 */

export const config = {
    /**
     * API Base URL - Change this for different environments
     */
    API_BASE_URL: 'http://localhost:8080/api',

    /**
     * Request timeout in milliseconds
     */
    API_TIMEOUT: 30000,

    /**
     * Environment flag
     */
    isDevelopment: __DEV__,
} as const;

/**
 * Environment-specific configurations
 * Uncomment and modify as needed for different environments
 */
// export const environments = {
//   development: {
//     API_BASE_URL: 'http://localhost:8080/api',
//   },
//   staging: {
//     API_BASE_URL: 'https://staging-api.appointmentmanager.com/api',
//   },
//   production: {
//     API_BASE_URL: 'https://api.appointmentmanager.com/api',
//   },
// };
