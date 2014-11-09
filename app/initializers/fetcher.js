import Ember from 'ember';
import Fetcher from '../services/fetcher';

export default {
  name: 'fetcher',
  initialize: function(container, application) {
    application.register('fetcher:main', Fetcher, {singleton: true});
    application.inject('fetcher:main', 'geolocator', 'geolocator:main');
    application.inject('fetcher:main', 'store', 'store:main');
    application.inject('route', 'fetcher', 'fetcher:main');
    application.inject('controller', 'fetcher', 'fetcher:main');
  }
}
