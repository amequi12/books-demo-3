import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
    model() {
        return EmberObject.create({
            eventDate: '',
            user: this.get('currentUser.user')
        });
    }
});
