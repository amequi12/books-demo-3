import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    dataService: service('data'),
    queryParams: {
        search: {
            refreshModel: true
        }
    },
    model({ search }) {
        if (search) {
          return this.store.query('book', { q: search });
        }
      return this.get('store').findAll('book');
    },

    setupController() {
      this._super(...arguments);
    },
    
    actions: {
        refreshBooks(){
            //this.refresh();
        },
        loading() {
            return false;
        }
    }
});
