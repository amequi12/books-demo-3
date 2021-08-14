import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    reportDate: null,
    store: service(),
    actions: {
        submitForm(e){
            e.preventDefault();
            this.onsubmit({
                id: this.get('reportId'),
                reportDate: this.get('reportDateView'),
                rating: this.get('rating'),
                presentationUrl: this.get('presentationUrl'),
                videoUrl: this.get('videoUrl'),
                review: this.get('review'),
                speaker: this.get('speaker'),
                book: this.get('book'),
                event: this.get('event')
            });
        },

        searchSpeaker(query) {
          return this.get('store').query('speaker', { q: query })
        },

        searchBook(query) {
            return this.get('store').query('book', { q: query })
        },

        searchEvent(query) {
            return this.get('store').query('event', { q: query })
        }
    },

    didReceiveAttrs() {
        this._super(...arguments);
        this.setProperties({
          reportId: this.get('report.id') ? this.get('report.id') : undefined,
          reportDateView: this.get('report.reportDateView'),
          rating: this.get('report.rating'),
          presentationUrl: this.get('report.presentationUrl'),
          videoUrl: this.get('report.videoUrl'),
          review: this.get('report.review'),
          speaker: this.get('report.speaker'),
          book: this.get('report.book'),
          event: this.get('report.event')
        });
    }
});
