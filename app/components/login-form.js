import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
import { get, set, computed } from '@ember/object';

const Validations = buildValidations({
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
    })
  ]
});

export default Component.extend(Validations, {
  i18n: service(),
  isInvalid: false,
  errorView: false,
  actions: {
    submitForm(e) {
      e.preventDefault();
      set(this, 'isInvalid', !this.get('validations.isValid'));
      if (!get(this, 'isInvalid')) {
        this.onsubmit({
          email: this.email,
          password: this.password
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
      password: this.get('user.password')
    });
  }
});
