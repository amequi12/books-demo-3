import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),
    actions: {
        deleteBook(id) {
            try {
                this.get('dataService').deleteBook(id);
                this.transitionToRoute('book.index');
            }
            catch (e) {
                this.send('error', new Error('Connection failed'));
            }
        }
    }
});
