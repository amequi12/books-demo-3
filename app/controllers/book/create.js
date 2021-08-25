import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';

export default Controller.extend({
  router: service(),
  currentURL: computed('router.currentURL', function () {
    return this.router.currentURL;
  }),
  currentUser: service(),
  actions: {
    async createBook(book) {
      try {
        let newBook = this.get('store').createRecord('book', book);
        newBook.serialize();
        await newBook.save();

        this.transitionToRoute('book.index');
      }
      catch (e) {
        get(this, 'errorLogger').log(e.message, get(this, 'currentURL'));
        this.send('error', new Error('Connection failed'));
      }
    }
  }
});