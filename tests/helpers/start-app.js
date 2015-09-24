import Ember from 'ember';
import registerAcceptanceTestHelpers from './201-created/register-acceptance-test-helpers';
import Application from '../../app';
import config from '../../config/environment';

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    registerAcceptanceTestHelpers();
  });

  return application;
}
