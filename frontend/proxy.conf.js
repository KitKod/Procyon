const API_SECURE = (process.env.API_SECURE ?? 'false') === 'true';
const API_HOST = process.env.API_HOST ?? 'localhost';
const API_PORT = Number(process.env.API_HOST ?? 8010);

const PROTOCOL = API_SECURE ? 'https' : 'http';

module.exports = {
    '/api/*': {
        target: `${PROTOCOL}://${API_HOST}:${API_PORT}`,
        secure: API_SECURE,
        logLevel: 'debug',
        changeOrigin: true,
    },
};
