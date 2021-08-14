import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        async editReport(report) {
          try {
            let reportModel = this.get('model');
            reportModel.setProperties(report);
            await reportModel.save();
            this.transitionToRoute('report.index');
          }
          catch (e) {
            this.send('error', new Error('Connection failed'));
          }
        }
      }
});
