import Route from '@ember/routing/route';

export default Route.extend({
    queryParams: {
        search: {
            refreshModel: true
        }
    },
    model({ search }) {
        if (search) {
          return this.store.query('event', { q: search });
        }
      return this.get('store').findAll('event');
    },

    setupController() {
      this._super(...arguments);
    },
    
    actions: {
        loading() {
            return false;
        }
    }
});