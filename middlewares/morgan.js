const morgan = require('morgan');

morgan.token('host', (req) => req.hostname);

morgan.token('body', (req) => {
    if (!req.body || Object.keys(req.body).length === 0) return '';
    return JSON.stringify(req.body);
});

morgan.token('clean-url', (req) => {
    return req.originalUrl.replace(/(api_key|apikey)=[^&]*/gi, '$1=***');
});

module.exports = morgan;