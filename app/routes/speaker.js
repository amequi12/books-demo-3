import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
    queryParams: {
        search: {
            refreshModel: true
        }
    },
    model({ search }) {
        try{
            if (search) {
                return this.store.query('speaker', { q: search });
              }
            return this.get('store').findAll('speaker');
        }
        catch(e){
            get(this, 'errorLogger').log(e.message, get(this, 'currentURL'));                
        }
    },

    setupController() {
      this._super(...arguments);
    },
    
    actions: {
        // refreshSpeakers(){
        //     //this.refresh();
        // },
        // loading() {
        //     return false;
        // }
    }
});
