import './config.js';
import './events.js';
import './helpers.js';
import './routes.js';

if (!Meteor.isProduction) {
  window.gtag = console.log;
}