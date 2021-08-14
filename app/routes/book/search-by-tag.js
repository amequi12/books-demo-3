import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    dataService: service('data'),
    model(params) {
        let tag = params[""];
        return this.get('store').query('book', { tags_like: tag });
    }
});
