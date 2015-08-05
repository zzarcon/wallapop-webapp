/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'wallapop-webapp',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    contentSecurityPolicy: {
      'img-src': "* 'self' 'unsafe-inline'",
      'connect-src': "*",
      'style-src': "* 'self' 'unsafe-inline'"
    },
    EmberENV: {
      FEATURES: {}
    },
    APP: {}
  };

  if (environment === 'development') {

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
