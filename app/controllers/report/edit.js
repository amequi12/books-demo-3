import Controller from '@ember/controller';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),
  currentURL: computed('router.currentURL', function () {
    return this.router.currentURL;
  }),
  actions: {
    async editReport(report) {
      try {
        let reportModel = this.get('model');
        reportModel.setProperties(report);
        await reportModel.save();
        this.transitionToRoute('report.index');
      }
      catch (e) {
        get(this, 'errorLogger').log(e.message, get(this, 'currentURL'));
        this.send('error', new Error('Connection failed'));
      }
    }
  }
});
