import Ember from 'ember';
import config from "reusable-components/config/environment";

export default Ember.Controller.extend({
  actions: {
    saveUser() {
      if (config.environment === "development") {
        this.transitionToRoute("users.index");
      } else {
        this.get('model').save().then(() => {
          this.transitionToRoute("users.index");
        });
      }
    }
  }
});
