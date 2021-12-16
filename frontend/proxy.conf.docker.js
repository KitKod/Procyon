const API_SECURE = process.env.API_SECURE === 'true';
const API_HOST = process.env.API_HOST;
const API_PORT = process.env.API_PORT;
const PROXY_DEBUG = process.env.PROXY_DEBUG === 'true';

const PROTOCOL = API_SECURE ? 'https' : 'http';

module.exports = {
    '/api/*': {
        target: `${PROTOCOL}://${API_HOST}:${API_PORT}`,
        secure: API_SECURE,
        ...(PROXY_DEBUG && { logLevel: 'debug' }),
        changeOrigin: true,
    },
};
