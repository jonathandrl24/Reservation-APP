/** Local development environment with sensitive configs. Not for production. */
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',

  // Add your important passwords/keys here
  // apiKey: 'sk-your-openai-or-other-key',
  // databasePassword: 'your-db-pass',  // for client-side if needed
  // authSecret: 'your-local-secret'
};

/* To use: import in services, e.g. reservation.service.ts:
import { environment } from '../../environments/environment.local';
(Note: For Angular, typically extend angular.json for custom builds or use runtime loading for true secrets.) */
