import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        async deleteEvent(event) {
            try {
                event.reports.forEach(report => report.destroyRecord());
                await event.destroyRecord();
                this.transitionToRoute('event.index');
            }
              catch (e) {
                this.send('error', new Error('Connection failed'));
            }
        }
    }
});
