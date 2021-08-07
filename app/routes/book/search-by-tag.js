import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    dataService: service('data'),
    model(params) {
        let tag = params[""];
        let books = this.get("dataService").getBooksByTag(tag);
        return books;
    }
});
