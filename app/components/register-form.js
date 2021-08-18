import Component from '@ember/component';

export default Component.extend({
  actions: {
    async submitForm(e) {
      e.preventDefault();

      this.onsubmit({
        email: this.email,
        username: this.username,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation
      });
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
