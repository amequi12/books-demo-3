import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    }
  },
  model({ search }) {
    try {
      if (search) {
        return this.store.query('report', { q: search });
      }
      return this.get('store').findAll('report');
    }
    catch (e) {
      get(this, 'errorLogger').log(e.message, get(this, 'currentURL'));
    }

  },

  afterModel(resolvedModel) {
    resolvedModel.save();
  },

  setupController() {
    this._super(...arguments);
  }
});
