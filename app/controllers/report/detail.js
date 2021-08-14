import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        async deleteReport(report) {
            try {
                await report.destroyRecord();
                this.transitionToRoute('report.index');
            }
              catch (e) {
                this.send('error', new Error('Connection failed'));
            }
        }
    }
});
