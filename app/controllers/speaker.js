import Controller from '@ember/controller';
import { debounce } from '@ember/runloop';
import { get, set } from '@ember/object';

export default Controller.extend({
    queryParams: ["search"],
    search: '',

    actions: {
        searchInputChange() {
            debounce(() => {
                set(this, 'search', get(this, 'searchLater'));
            }, 1500);
        }
    }
});
