import Route from '@ember/routing/route';

export default Route.extend({
    object: 0,
    model({id}) {
        return this.get('store').findRecord('speaker', id);
    }
});
