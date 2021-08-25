import Controller from '@ember/controller';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),
  currentURL: computed('router.currentURL', function () {
    return this.router.currentURL;
  }),
  actions: {
    async createReport(report) {
      try {
        let newReport = this.get('store').createRecord('report', report);
        newReport.serialize();
        await newReport.save();

        this.transitionToRoute('report.index');
      }
      catch (e) {
        get(this, 'errorLogger').log(e.message, get(this, 'currentURL'));
        this.send('error', new Error('Connection failed'));
      }
    }
  }
});
