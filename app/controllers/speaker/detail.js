import Controller from '@ember/controller';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    router: service(),
    currentURL: computed('router.currentURL', function () {
        return this.router.currentURL;
    }),
    actions: {
        async deleteSpeaker(speaker) {
            try {
                await speaker.destroyRecord();
                this.transitionToRoute('speaker.index');
            }
            catch (e) {
                get(this, 'errorLogger').log(e.message, get(this, 'currentURL'));
                this.send('error', new Error('Connection failed'));
            }
        }
    }
});
