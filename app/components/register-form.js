import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  username: [
    validator('ds-error'),
    validator('presence', {
      presence: true,
      message: computed('model.{i18n.locale}', function () {
        return '{description} ' + get(this, 'model.i18n').t('errors.blank');
      }),
    }),
  ],
  email: [
    validator('ds-error'),
    validator('presence', {
      presence: true,
      message: computed('model.{i18n.locale}', function () {
        return '{description} ' + get(this, 'model.i18n').t('errors.blank');
      }),
    }),
    validator('format', { type: 'email',
    message: computed('model.{i18n.locale}', function () {
      return '{description} ' + get(this, 'model.i18n').t('errors.email');
    }) 
  })
  ],
  password: [
    validator('ds-error'),
    validator('presence', {
      presence: true,
      message: computed('model.{i18n.locale}', function () {
        return '{description} ' + get(this, 'model.i18n').t('errors.blank');
      }),
    }),
    validator('length', {
      min: 4,
      max: 8
    })
  ],
  passwordConfirmation: [
    validator('ds-error'),
    validator('presence', {
      presence: true,
      message: computed('model.{i18n.locale}', function () {
        return '{description} ' + get(this, 'model.i18n').t('errors.blank');
      }),
    }),
    validator('confirmation', {
      on: 'password',
      message: computed('model.{passwordConfirmation,i18n.locale}', function () {
        return '{description} ' + get(this, 'model.i18n').t('errors.passwordDontMatch');
      }),
      description: computed('model.{passwordConfirmation,i18n.locale}', function () {
        return get(this, 'model.i18n').t('errors.passwordDescription');
      })
    })
  ]
});


export default Component.extend(Validations, {
  i18n: service(),
  isFormValid: computed.alias('validations.isValid'),
  errorView: false,
  actions: {
    async submitForm(e) {
      e.preventDefault();
      if (this.get('isFormValid')) {
        this.onsubmit({
          email: this.email,
          username: this.username,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation
        });
      }
      else {
        this.set('errorView', true);
      }
    }
  },

  didReceiveAttrs() {
    this.setProperties({
      email: this.get('user.email'),
      username: this.get('user.username'),
      password: this.get('user.password'),
      passwordConfirmation: this.get('user.passwordConfirmation')
    });
  }
});
