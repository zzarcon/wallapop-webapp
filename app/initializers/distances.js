export default {
  name: 'distances',
  after: 'store',
  initialize: function(container, application) {
    var store = container.lookup('store:main');

    [['Nearby (1km)', 1], ['On my area(5km)', 5], ['On my city(10km)', 10], ['Far', ""]].forEach(function(pair) {
      store.createRecord('distance', {title: pair[0], distance: pair[1].toString()});
    });
  }
};
