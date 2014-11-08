import Geolocator from '../services/geolocator';
import Ember from 'ember';

export default {
  name: 'geolocator',

  initialize: function(container, application) {
    application.register('geolocator:main', Geolocator, {singleton: true});
    application.inject('route', 'geolocator', 'geolocator:main');
    application.inject('controller', 'geolocator', 'geolocator:main');
  }
};
