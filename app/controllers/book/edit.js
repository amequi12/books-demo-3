import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';

export default Controller.extend({
  router: service(),
  currentURL: computed('router.currentURL', function () {
    return this.router.currentURL;
  }),
  actions: {
    async editBook(book) {
      try {
        let bookModel = this.get('model');
        bookModel.setProperties(book);
        await bookModel.save();
        this.transitionToRoute('book.index');
      }
      catch (e) {
        get(this, 'errorLogger').log(e.message, get(this, 'currentURL'));

        this.send('error', new Error('Connection failed'));
      }
    }
  }
});
