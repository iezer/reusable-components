import Ember from 'ember';

export default Ember.Controller.extend({
  errorMessage: null,

  actions: {
    saveUser() {
      this.set("errorMessage", null);

      let user = this.get('model');
      user.save().then(() => {
        this.transitionToRoute("users.index"); /* ROUTE!! */
      }).catch((e) => {
        let errorDetails = e.errors.mapBy('detail').join(',');
        this.set('errorMessage', errorDetails);
      });
    }
  }
});
