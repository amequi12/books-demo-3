import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
    model(params) {
        try{
            let tag = params[""];
            return this.get('store').query('book', { tags_like: tag });
        }
        catch(e){
            get(this, 'errorLogger').log(e.message, get(this, 'currentURL'));                
        }
    }
});
