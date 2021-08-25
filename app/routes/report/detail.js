import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
    model({id}) {
        try{
            return this.get('store').findRecord('report', id);
        }
        catch(e){
            get(this, 'errorLogger').log(e.message, get(this, 'currentURL'));                
        }
    },
    afterModel(resolvedModel) {
        resolvedModel.save();
    }
});
