import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  actions: {
    async createBook(book) {
      try {
        let newBook = this.get('store').createRecord('book', book);
        newBook.serialize();
        await newBook.save();

        this.transitionToRoute('book.index');
      }
      catch (e) {
        this.send('error', new Error('Connection failed'));
      }
    }
  }
});