import Controller from '@ember/controller';

export default Controller.extend({
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
            this.send('error', new Error('Connection failed'));
          }
        }
      }
});
