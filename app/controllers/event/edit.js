import Controller from '@ember/controller';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),
  currentURL: computed('router.currentURL', function () {
    return this.router.currentURL;
  }),
  actions: {
    async editEvent(event) {
      try {
        let eventModel = this.get('model');
        eventModel.setProperties(event);
        const reports = eventModel.get('reports');
        const dateToSet = eventModel.get('eventDate');

        let saveReportsPromises = [];
        reports.forEach(report => {
          report.set('reportDate', dateToSet);
          saveReportsPromises.push(report.save());
        });
        await Promise.all(saveReportsPromises);
        await eventModel.save();

        this.transitionToRoute('event.index');
      }
      catch (e) {
        get(this, 'errorLogger').log(e.message, get(this, 'currentURL'));
        this.send('error', new Error('Connection failed'));
      }
    }
  }
});
