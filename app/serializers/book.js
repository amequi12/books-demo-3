import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin,{
    attrs: {
        reports: {
          serialize: false,
          deserialize: 'records'
        }
      },
    normalize() {
        return this._super(...arguments);
    },
    
    // serialize(snapshot) {
    //     let json = this._super(...arguments);
    //     json.type = snapshot.modelName;
    //     return json;
    // }
});
