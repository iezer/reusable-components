import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('user', params.userId);
  },

  actions: {
    saveUser(payload, user) {
      this.set("errorMessage", null);

      user.setProperties(payload);
      user.save().then(() => {
        this.transitionTo("users.index");
      }).catch((e) => {
        let errorDetails = e.errors.mapBy('detail').join(',');
        this.controller.set('errorMessage', errorDetails);
        //rollback
      });
    }
  }
});
