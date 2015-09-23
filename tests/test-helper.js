import resolver from './helpers/resolver';
import FakeServer from 'ember-cli-fake-server';

import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

QUnit.testStart(function(){
  FakeServer.start();
});

QUnit.testDone(function(){
  FakeServer.stop();
});
