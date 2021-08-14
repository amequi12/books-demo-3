import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
    model({ book, speaker, event }) {
        return EmberObject.create({
            reportDate: '',
            rating: '',
            presentationUrl: '',
            videoUrl: '',
            review: '',
            speaker: this.get('store').findRecord('speaker', speaker),
            event: this.get('store').findRecord('event', event),
            book: this.get('store').findRecord('book', book)
        });
    }
});
