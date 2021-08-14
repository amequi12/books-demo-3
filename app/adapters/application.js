import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    host: 'http://localhost:3000',
    init() {
        this._super(...arguments);
        this.set('headers', {
          'Content-Type': 'application/json'
        });
    },
    
    buildURL(modelName, id, snapshot, requestType) {
      let url = this._super(...arguments);
      if (modelName === 'report' && requestType === 'findRecord' && id) {
        url += '?_expand=speaker&_expand=book&_expand=event';
      }
      if (modelName === 'book' && requestType === 'findRecord' && id) {
        url += '?_embed=reports';
      }
      if (modelName === 'speaker' && requestType === 'findRecord' && id) {
        url += '?_embed=reports';
      }
      if (modelName === 'event' && requestType === 'findRecord' && id) {
        url += '?_embed=reports';
      }
      return url;
    }
});
