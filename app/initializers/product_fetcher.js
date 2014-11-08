import Ember from 'ember';
import ProductFetcher from '../services/product_fetcher';

export default {
  name: 'product-fetcher',
  initialize: function(container, application) {
    application.register('fetcher:product', ProductFetcher, {singleton: true});
    application.inject('fetcher:product', 'geolocator', 'geolocator:main');
    application.inject('fetcher:product', 'store', 'store:main');
    application.inject('route', 'productFetcher', 'fetcher:product');
    application.inject('controller', 'productFetcher', 'fetcher:product');
  }
}
