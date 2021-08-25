import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    currentUser: service(),
    model({id}) {
        let newReport =  EmberObject.create({
            reportDate: '',
            rating: '',
            presentationUrl: '',
            videoUrl: '',
            review: '',
            speaker: '',
            event: this.get('store').findRecord('event', id),
            book: '',
            user: this.get('currentUser.user')
        });
        newReport.reportDate = newReport.event.eventDate;
        return newReport;
    }
});
