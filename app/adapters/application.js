import DS from 'ember-data';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend({
    session: service(),
    host: 'http://localhost:3000',

    headers: computed(function() {
      let resultHeaders = {
        'Content-Type': 'application/json'
      };
  
      if (this.get('session.isAuthenticated')) {
        resultHeaders['Authorization'] = `Bearer ${this.session.data.authenticated.token}`;
      }
  
      return resultHeaders;
    }).volatile(),
    
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
