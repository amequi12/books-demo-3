import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        async createReport(report){
          try {
            let newReport = this.get('store').createRecord('report', report);
            newReport.serialize();
            await newReport.save();
            
            this.transitionToRoute('report.index');
          }
          catch (e) {
            this.send('error', new Error('Connection failed'));
          }
        }
    }
});
