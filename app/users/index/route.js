import Ember from 'ember';
import config from "reusable-components/config/environment";

export default Ember.Route.extend({
  model() {
    if (config.environment === "development") {
      return this._developmentData();
    } else {
      return this.store.findAll('user');
    }
  },

  _developmentData() {
    return this.store.push({
      data: [
        {
          id: "1",
          type: "user",
          attributes: {
            "firstName": "Louis",
            "lastName": "Armstrong"
          }
        },
        {
          id: "2",
          type: "user",
          attributes: {
            "firstName": "Miles",
            "lastName": "Davis"
          }
        }
      ]
    });
  }
});
