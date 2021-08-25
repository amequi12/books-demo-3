import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
    firstName: [
        validator('ds-error'),
        validator('presence', {
            presence: true,
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            }),
        })
    ],
    middleName: [
        validator('ds-error'),
        validator('presence', {
            presence: true,
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            }),
        })
    ],
    lastName: [
        validator('ds-error'),
        validator('presence', {
            presence: true,
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            }),
        })
    ]
});

export default Component.extend(Validations, {
    router: service(),
    currentURL: computed('router.currentURL', function () {
        return this.router.currentURL;
    }),
    i18n: service(),
    isFormValid: computed.alias('validations.isValid'),
    errorView: false,
    actions: {
        submitForm(e) {
            e.preventDefault();
            if (this.get('isFormValid')) {
                this.onsubmit({
                    id: this.get('speakerId'),
                    firstName: this.get('firstName'),
                    middleName: this.get('middleName'),
                    lastName: this.get('lastName'),
                    user: this.get('user')
                });
            }
            else {
                get(this, 'errorLogger').log('Form is invalid', get(this, 'currentURL'));
                this.set('errorView', true);
            }
        }
    },

    didReceiveAttrs() {
        this._super(...arguments);
        this.setProperties({
            speakerId: this.get('speaker.id') ? this.get('speaker.id') : undefined,
            firstName: this.get('speaker.firstName'),
            middleName: this.get('speaker.middleName'),
            lastName: this.get('speaker.lastName'),
            user: this.get('speaker.user')
        });
    }
});
