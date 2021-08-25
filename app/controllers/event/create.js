import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';

export default Controller.extend({
  router: service(),
  currentURL: computed('router.currentURL', function () {
    return this.router.currentURL;
  }),
  actions: {
    async createEvent(event) {
      try {
        let newEvent = this.get('store').createRecord('event', event);
        newEvent.serialize();
        await newEvent.save();

        this.transitionToRoute('event.index');
      }
      catch (e) {
        get(this, 'errorLogger').log(e.message, get(this, 'currentURL'));
        this.send('error', new Error('Connection failed'));
      }
    }
  }
});
