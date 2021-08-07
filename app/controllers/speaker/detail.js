import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),
    actions: {
        deleteSpeaker(id) {
            try {
                this.get('dataService').deleteSpeaker(id);
                this.transitionToRoute('speaker.index');
            }
              catch (e) {
                this.send('error', new Error('Connection failed'));
            }
        }
    }
});
