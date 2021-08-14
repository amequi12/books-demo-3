import DS from 'ember-data';

export default DS.Model.extend({
    eventDate: DS.attr('date-string'),

    reports: DS.hasMany('report')
});
