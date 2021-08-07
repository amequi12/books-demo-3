import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
    model() {
        return EmberObject.create({
            bookName: '',
            author: '',
            pagesNumber: '',
            cover: '',
            tags: []
        });
    }
});
