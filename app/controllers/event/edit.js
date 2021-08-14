import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        async editEvent(event) {
          try {
            let eventModel = this.get('model');
            eventModel.setProperties(event);
            await eventModel.save();
            this.transitionToRoute('event.index');
          }
          catch (e) {
            this.send('error', new Error('Connection failed'));
          }
        }
      }
});
