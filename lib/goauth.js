var google = require('googleapis');

function GOAuth(config) {
  return new google.auth.JWT(config.saEmail, null, config.apiKey, config.scopes);
}

module.exports = GOAuth;
