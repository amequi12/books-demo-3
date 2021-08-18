import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    currentUser: service(),
    model() {
        return EmberObject.create({
            bookName: '',
            author: '',
            pagesNumber: '',
            cover: '',
            tags: [],
            user: this.get('currentUser.user')
        });
    }
});
