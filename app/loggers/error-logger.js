import EmberObject from '@ember/object';
import { get, set } from '@ember/object';
import { A } from '@ember/array';
import { later } from '@ember/runloop';
export default EmberObject.extend({

    init() {
        set(this, 'errorsArray', A());
    },

    postErrors(errors){
        // eslint-disable-next-line no-unused-vars
        let laterId = later( async ()=>{
            errors.forEach( (errorToSend) => {
                fetch(`http://localhost:3000/errors`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(errorToSend)
                }).then((response) => {
                    errors.removeObject(errorToSend);
                    return response.json();
                });
            })
            if(errors.length > 0){
                this.postErrors(errors);
            }            
        }, 5000)
    },

    log(error, url) {
        let date = this.getCurrentTime();
        let errors = get(this, 'errorsArray');
        errors.pushObject({
            errorMessage: error,
            errorUrl: url,
            errorDate: date
        });
        this.postErrors(errors);
    },

    getCurrentTime() {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        return today.toISOString()
    }
});