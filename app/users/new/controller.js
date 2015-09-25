import Ember from 'ember';

export default Ember.Controller.extend({
  errorMessage: null,

  actions: {
    submitUser(payload) {
      this.send('createOrUpdateUser', payload, null, this);
    }
  }

});
