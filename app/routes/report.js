import Route from '@ember/routing/route';

export default Route.extend({
    queryParams: {
        search: {
            refreshModel: true
        }
    },
    model({ search }) {
      if (search) {
        return this.store.query('report', { q: search });
      }
      return this.get('store').findAll('report');
    },

    afterModel(resolvedModel) {
        resolvedModel.save();
    },

    setupController() {
      this._super(...arguments);
    }
});
