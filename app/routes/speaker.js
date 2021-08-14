import Route from '@ember/routing/route';

export default Route.extend({
    queryParams: {
        search: {
            refreshModel: true
        }
    },
    model({ search }) {
        if (search) {
          return this.store.query('speaker', { q: search });
        }
      return this.get('store').findAll('speaker');
    },

    setupController() {
      this._super(...arguments);
    },
    
    actions: {
        refreshSpeakers(){
            //this.refresh();
        },
        loading() {
            return false;
        }
    }
});
