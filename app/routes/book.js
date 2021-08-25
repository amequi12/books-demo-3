import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend({
    dataService: service('data'),
    queryParams: {
        search: {
            refreshModel: true
        }
    },
    model({ search }) {
        try {
            if (search) {
                return this.store.query('book', { q: search });
            }
            return this.get('store').findAll('book');
        }
        catch (e) {
            get(this, 'errorLogger').log(e.message, get(this, 'currentURL'));
        }
    },

    setupController() {
        this._super(...arguments);
    },

    actions: {
        // refreshBooks() {
        //     this.refresh();
        // },
        // loading() {
        //     return false;
        // }
    }
});
