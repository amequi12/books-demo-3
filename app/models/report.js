import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    reportDate: DS.attr('date-string'),
    rating: DS.attr('number'),
    presentationUrl: DS.attr('string'),
    videoUrl: DS.attr('string'),
    review: DS.attr(),

    event: DS.belongsTo('event'),
    book: DS.belongsTo('book'),
    speaker: DS.belongsTo('speaker'),
    reportDateView: computed('event.eventDate', function(){
        return this.get('event.eventDate');
    }),
    user: DS.belongsTo('user')
});
