var envs = require('envs');

function getProfiles() {
  var separator = ',';
  var ids = envs('GA_PROFILE_IDS').split(separator);
  var names = envs('GA_PROFILE_NAMES').split(separator, ids.length);

  return ids.map(profile, names);
}

function profile(id, index) {
  return {
    id: id,
    name: this[index]
  };
}

function GAConfig() {
  this.saEmail = envs('GA_EMAIL');
  this.apiKey = envs('GOOGLE_APPLICATION_CREDENTIALS');
  this.scopes = envs('GOOGLE_APPLICATION_SCOPES') || 'https://www.googleapis.com/auth/analytics.readonly';
  this.profiles = getProfiles();
}

module.exports = GAConfig;