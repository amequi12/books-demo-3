import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async createUser(user) {
      let newUser;
      try {
        newUser = this.get('store').createRecord('user', user);
        await newUser.save();

        this.transitionToRoute('index');
      }
      catch(e) {
        e.user = newUser;
        this.send('error', e);
      }
    },

    error(error) {
      this.set('errors', error.user.errors);
      return false;
    }
  },

  resetErrors() {
    this.set('errors', {});
  }
});