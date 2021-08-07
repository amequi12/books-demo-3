import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import { later } from '@ember/runloop';

export default Route.extend({
    dataService: service('data'),
    queryParams: {
        search: {
            refreshModel: true
        }
    },
    model({ search }) {
        let promise = new Promise((resolve, reject) => {
            later(async () => {
              try {
                let books = search ? await this.get("dataService").getBooks(search) : await this.get("dataService").getBooks();
                resolve(books);
              }
              catch (e) {
                reject('Connection failed');
              }
            }, 1000);
          }).
          then((books) => {
            this.set('controller.model', books);
          }).
          finally(() => {
            if (promise === this.get('modelPromise')) {
              this.set('controller.isLoading', false);
            }
          });
      
          this.set('modelPromise', promise);
          return { isLoading: true };
    },

    setupController(controller) {
      this._super(...arguments);
      if (this.get('modelPromise')) {
        controller.set('isLoading', true);
      }
    },
    
    actions: {
        refreshBooks(){
            this.refresh();
        },
        loading() {
            return false;
        }
    }
});
