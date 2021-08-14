import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        async deleteSpeaker(speaker) {
            try {
                await speaker.destroyRecord();
                this.transitionToRoute('speaker.index');
            }
              catch (e) {
                this.send('error', new Error('Connection failed'));
            }
        }
    }
});
