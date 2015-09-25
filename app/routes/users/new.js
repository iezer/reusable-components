import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
    saveUser(payload) {
      this.set("errorMessage", null);

      let user = this.store.createRecord('user', payload);
      user.save().then(() => {
        this.transitionTo("users.index"); /* ROUTE!! */
      }).catch((e) => {
        let errorDetails = e.errors.mapBy('detail').join(',');
        this.controller.set('errorMessage', errorDetails);
      });
    }
  }

});
