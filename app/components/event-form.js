import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
    eventDate: [
        validator('ds-error'),
        validator('presence', {
            presence: true,
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            }),
        }),
    ]
});

export default Component.extend(Validations, {
    router: service(),
    currentURL: computed('router.currentURL', function () {
        return this.router.currentURL;
    }),
    store: service(),
    i18n: service(),
    isFormValid: computed.alias('validations.isValid'),
    errorView: false,
    actions: {
        submitForm(e) {
            e.preventDefault();
            if (this.get('isFormValid')) {
                this.onsubmit({
                    id: this.get('eventId'),
                    eventDate: this.get('eventDate'),
                    user: this.get('user')
                });
            }
            else {
                get(this, 'errorLogger').log('Form is invalid', get(this, 'currentURL'));
                this.set('errorView', true);
            }
        },

        searchSpeaker(query) {
            return this.get('store').query('speaker', { q: query })
        },

        searchBook(query) {
            return this.get('store').query('book', { q: query })
        }
    },

    didReceiveAttrs() {
        this._super(...arguments);
        this.setProperties({
            eventId: this.get('event.id') ? this.get('event.id') : undefined,
            eventDate: this.get('event.eventDate'),
            user: this.get('event.user')
        });
    }
});
