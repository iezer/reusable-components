import Ember from 'ember';
import config from "reusable-components/config/environment";

export default Ember.Controller.extend({
  firstName: null,
  lastName: null,
  errorMessage: null,

  actions: {
    saveUser() {
      this.set("errorMessage", null);
      let user =
      this.store.createRecord('user', {
        firstName: this.get('firstName'),
        lastName: this.get('lastName')
      });

      user.save().then(() => {
        this.transitionToRoute("users.index");
      }).catch((e) => {
        let errorDetails = e.errors.mapBy('detail').join(',');
        this.set('errorMessage', errorDetails);
      });
    }
  }
});
