import Ember from 'ember';

export default Ember.Component.extend({
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
