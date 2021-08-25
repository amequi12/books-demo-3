import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { get } from '@ember/object';

export default Route.extend(ApplicationRouteMixin, {
  session: service(),
  currentUser: service(),

  beforeModel() {
    this._super(...arguments);

    this.loadUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);

    this.loadUser();
  },

  sessionInvalidated() {
    this.get('currentUser').resetCurrentUser();
    window.location.replace('/login');
  },

  loadUser() {
    if (this.get('session.isAuthenticated')) {
      try {
        this.get('currentUser').load();
      }
      catch (e) {
        get(this, 'errorLogger').log(e.message, get(this, 'currentURL'));
      }
    }
  },

  actions: {
    error(error, transition) {
      if (transition) {
        transition.abort();
      }
      this.intermediateTransitionTo('error', { error: error.message });
      return true;
    }
  }
});
