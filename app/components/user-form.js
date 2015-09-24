import Ember from 'ember';

export default Ember.Component.extend({
  firstName: null,
  lastName: null,
  errorMessage: null,

  actions: {
    saveUser() {
      this.set("errorMessage", null);
      let payload = {
        firstName: this.get('firstName'),
        lastName: this.get('lastName')
      };

      this.sendAction('action', payload);
    }
  }

});
