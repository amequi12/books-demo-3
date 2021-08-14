import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        async createEvent(event){
          try {
            let newEvent = this.get('store').createRecord('event', event);
            newEvent.serialize();
            await newEvent.save();
            
            this.transitionToRoute('event.index');
          }
          catch (e) {
            this.send('error', new Error('Connection failed'));
          }
        }
    }
});
