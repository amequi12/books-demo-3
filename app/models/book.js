import DS from 'ember-data';

export default DS.Model.extend({
    bookName: DS.attr('string'),
    author: DS.attr('string'),
    pagesNumber: DS.attr('string'),
    cover: DS.attr('string'),
    tags: DS.attr(),

    reports: DS.hasMany('report'),
    user: DS.belongsTo('user')
});
