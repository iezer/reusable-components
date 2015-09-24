import Ember from 'ember';

export default Ember.Controller.extend({
  firstName: null,
  lastName: null,

  actions: {
    saveUser() {
      this.store.createRecord('user', {
        firstName: this.get('firstName'),
        lastName: this.get('lastName')
      }).save().then(() => {
        this.transitionToRoute("users.index");
      });
    }
  }
});
