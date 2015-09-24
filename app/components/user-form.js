import Ember from 'ember';

export default Ember.Component.extend({
  firstName: null,
  lastName: null,
  errorMessage: null,

  buttonText: Ember.computed(function() {
    return this.get('model') ? "Update" : "Submit";
  }),

  actions: {
    saveUser() {
      this.set("errorMessage", null);
      let payload = {
        firstName: this.get('firstName'),
        lastName: this.get('lastName')
      };
      let model = this.get('model');
      this.sendAction('action', payload, model);
    }
  }

});
