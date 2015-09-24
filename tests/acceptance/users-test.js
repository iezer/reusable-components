import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'reusable-components/tests/helpers/start-app';
import { stubRequest } from "ember-cli-fake-server";

module('Acceptance | users', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    try {
      Ember.run(this.application, 'destroy');
    } catch(e) {
      Ember.run(this.application, 'destroy');
    }
  }
});

function userData(firstName, lastName, id = "1") {
  return {
    id: id,
    type: "user",
    attributes: {
      "first-name": firstName,
      "last-name": lastName
    }
  };
}

function userInfo(firstName, lastName) {
  return `li:contains(${firstName} ${lastName})`;
}

test('visiting /users', function(assert) {
  assert.expect(3);
  let firstName = "Thelonious", lastName = "Monk";

  // ember-cli-fake-server
  stubRequest('get', '/users', (request) => {
    assert.ok(true, 'get /users api called');

    request.ok({ data: [ userData(firstName, lastName) ] });
  });

  visit('/users');

  andThen(() => {
    assert.equal(currentURL(), '/users');

    // ember-cli-acceptance-test-helpers
    expectElement(userInfo(firstName, lastName));
  });
});
