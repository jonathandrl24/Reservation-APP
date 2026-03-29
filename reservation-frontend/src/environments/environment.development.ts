/**
 * Development: empty `apiUrl` → requests go to the same origin as `ng serve` and are forwarded to the
 * backend by `proxy.conf.json` (target URL is the “environment” for the API during local dev).
 */
export const environment = {
  production: false,
  apiUrl: '',
};
