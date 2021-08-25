import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
    bookName: [
        validator('ds-error'),
        validator('presence', {
            presence: true,
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            }),
        }),
    ],
    author: [
        validator('ds-error'),
        validator('presence', {
            presence: true,
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            }),
        })
    ],
    pagesNumber: [
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
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.invalid');
            })
        })
    ],
    cover: [
        validator('ds-error'),
        validator('presence', {
            presence: true,
            message: computed('model.{i18n.locale}', function () {
                return '{description} ' + get(this, 'model.i18n').t('errors.blank');
            }),
        })
    ],
    tags: [
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
                    id: this.get('bookId'),
                    bookName: this.get('bookName'),
                    author: this.get('author'),
                    pagesNumber: this.get('pagesNumber'),
                    cover: this.get('cover'),
                    tags: this.get('tags').toString().split(','),
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
            bookId: this.get('book.id') ? this.get('book.id') : undefined,
            bookName: this.get('book.bookName'),
            author: this.get('book.author'),
            pagesNumber: this.get('book.pagesNumber'),
            cover: this.get('book.cover'),
            tags: this.get('book.tags'),
            user: this.get('book.user')
        });
    }
});
