const serverless = require('serverless-http');
const app = require('../../src/app');

// Netlify Function Handler
module.exports.handler = serverless(app);
