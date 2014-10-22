function getProfiles(env) {
  var separator = ',';
  var ids = env.GA_PROFILE_IDS.split(separator);
  var names = env.GA_PROFILE_NAMES.split(separator, ids.length);

  return ids.map(profile, names);
}

function profile(id, index) {
  return {
    id: id,
    name: this[index]
  };
}

function GAConfig(env) {
  this.credentials = {
    user: env.GA_USER,
    password: env.GA_PASSWORD
  };
  this.profiles = getProfiles(env);
}

module.exports = GAConfig;