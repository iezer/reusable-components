import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    saveUser(payload) {
      let user = this.store.createRecord('user');
      user.setProperties(payload);
      user.save().then(() => {
        this.transitionTo("users.index");
      }).catch((e) => {
        let errorDetails = e.errors.mapBy('detail').join(',');
        this.controller.set('errorMessage', errorDetails);
      });
    }
  }

});
