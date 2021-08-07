import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    dataService: service('data'),
    model({id}) {
        let book = this.get("dataService").getBook(parseInt(id));
        return book; 
    }
});
