import Ember from 'ember';

export default Ember.Controller.extend({
  firstName: null,
  lastName: null,
  errorMessage: null,

  actions: {
    saveUser() {
      this.set("errorMessage", null);

      let user = this.get('model');
      user.save().then(() => {
        this.transitionToRoute("users.index");
      }).catch((e) => {
        let errorDetails = e.errors.mapBy('detail').join(',');
        this.set('errorMessage', errorDetails);
      });
    }
  }
});
