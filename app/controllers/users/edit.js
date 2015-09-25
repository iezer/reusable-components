import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submitUser(payload, user) {
      if (user) {
        this.send('createOrUpdateUser', payload, user, this);
      }
    }
  }

});
