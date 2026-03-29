/**
 * Dev-server proxy: forwards `/reservas` to the Spring API.
 * Override target with env var, e.g. `RESERVATION_API_URL=http://127.0.0.1:8080 npm start`
 */
const target = process.env['RESERVATION_API_URL'] ?? 'http://localhost:8080';

module.exports = {
  '/reservas': {
    target,
    secure: false,
    changeOrigin: true,
  },
};
