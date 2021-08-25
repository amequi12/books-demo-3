import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
    rating: [
        validator('ds-error'),
        validator('presence', {
            presence: true,
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            }),
        }),
        validator('number', {
            allowString: true,
            integer: true,
            gt: 0,
            lte: 5,
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.wrongRating');
            })
        })
    ],
    presentationUrl: [
        validator('ds-error')
    ],
    videoUrl: [
        validator('ds-error')
    ],
    review: [
        validator('ds-error'),
        validator('presence', {
            presence: true,
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            }),
        })
    ],
    book: [
        validator('ds-error'),
        validator('belongs-to', {
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            })
        }),
        validator('presence', {
            presence: true,
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            }),
        })
    ],
    speaker: [
        validator('ds-error'),
        validator('belongs-to', {
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            })
        }),
        validator('presence', {
            presence: true,
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            }),
        })
    ],
    event: [
        validator('ds-error'),
        validator('belongs-to', {
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            })
        }),
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
    reportDate: null,
    store: service(),
    actions: {
        submitForm(e) {
            e.preventDefault();
            if (this.get('isFormValid')) {
                this.onsubmit({
                    id: this.get('reportId'),
                    reportDate: this.get('reportDate'),
                    rating: this.get('rating'),
                    presentationUrl: this.get('presentationUrl'),
                    videoUrl: this.get('videoUrl'),
                    review: this.get('review'),
                    speaker: this.get('speaker'),
                    book: this.get('book'),
                    event: this.get('event'),
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
        },

        searchEvent(query) {
            return this.get('store').query('event', { q: query })
        }
    },

    didReceiveAttrs() {
        this._super(...arguments);
        this.setProperties({
            reportId: this.get('report.id') ? this.get('report.id') : undefined,
            reportDate: this.get('report.event.eventDate'),
            rating: this.get('report.rating'),
            presentationUrl: this.get('report.presentationUrl'),
            videoUrl: this.get('report.videoUrl'),
            review: this.get('report.review'),
            speaker: this.get('report.speaker'),
            book: this.get('report.book'),
            event: this.get('report.event'),
            user: this.get('report.user')
        });
    }
});
