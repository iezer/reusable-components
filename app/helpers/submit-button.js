import Ember from 'ember';

export function submitButton(params/*, hash*/) {
  let model = params[0];
  return model ? "Update" : "Submit";
}

export default Ember.Helper.helper(submitButton);
