import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    store: service(),
    actions: {
        submitForm(e){
            e.preventDefault();
            this.onsubmit({
                id: this.get('eventId'),
                eventDate: this.get('eventDate')
            });
        },

        searchSpeaker(query) {
          return this.get('store').query('speaker', { q: query })
        },

        searchBook(query) {
            return this.get('store').query('book', { q: query })
        }
    },

    didReceiveAttrs() {
        this._super(...arguments);
        this.setProperties({
          eventId: this.get('event.id') ? this.get('event.id') : undefined,
          eventDate: this.get('event.eventDate')
        });
    }
});
