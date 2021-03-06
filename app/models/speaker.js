import DS from 'ember-data';

export default DS.Model.extend({
    firstName: DS.attr('string'),
    middleName: DS.attr('string'),
    lastName: DS.attr('string'),

    reports: DS.hasMany('report'),
    user: DS.belongsTo('user')
});
