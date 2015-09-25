import Ember from 'ember';

export default Ember.Component.extend({
  model: null,
  firstName: Ember.computed.reads('model.firstName'),
  lastName: Ember.computed.reads('model.lastName'),

  actions: {
    saveUser: function() {
      let payload = {
        firstName: this.get('firstName'),
        lastName: this.get('lastName')
      };

      this.sendAction('action', payload, this.get('model'));
    }
  }
});
