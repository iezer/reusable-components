import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createOrUpdateUser(payload, user, controller) {
      this.set("errorMessage", null);

      user = user || this.store.createRecord('user');
      user.setProperties(payload);
      user.save().then(() => {
        this.transitionTo("users.index");
      }).catch((e) => {
        let errorDetails = e.errors.mapBy('detail').join(',');
        controller.set('errorMessage', errorDetails);
        user.rollback();
      });
    }
  }

});
