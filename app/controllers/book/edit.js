import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),
    actions: {
      async editBook(book) {
        try {
          await this.get("dataService").editBook(book);  
          this.transitionToRoute('book.index');
        }
        catch (e) {
          this.send('error', new Error('Connection failed'));
        }
      }
    }
});
