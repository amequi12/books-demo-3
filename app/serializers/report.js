import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
    normalize() {
        return this._super(...arguments);
    },
    
    // serialize(snapshot) {
    //     let json = this._super(...arguments);
    //     json.type = snapshot.modelName;
    //     return json;
    // }
});
