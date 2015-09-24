import Ember from 'ember';
import { module, test, skip } from 'qunit';
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

test("can create new user", function(assert) {
  assert.expect(4);
  let firstName = "Thelonious", lastName = "Monk";

  //ember-cli-fake-server
  stubRequest('POST', '/users', (request) => {
    assert.ok(true, 'POST /users api called');
    request.created({ data: userData(firstName, lastName) } );
  });

  stubRequest('GET', '/users', (request) => {
    assert.ok(true, 'get /users api called');
    request.ok({ data: [ userData(firstName, lastName) ] } );
  });

  visit("/users/new");

  andThen(() => {
    fillIn("input[name=firstName]", firstName);
    fillIn("input[name=lastName]", lastName);
    click("button:contains(Create)");
  });

  andThen(() => {
    assert.equal(currentURL(), '/users', 'redirected to index');
    expectElement(userInfo(firstName, lastName)); // ember-cli-acceptance-test-helpers
  });
});

test("shows user creation errors", function(assert) {
  assert.expect(3);
  let errorMessage = "save failed";
  stubRequest('POST', '/users', (request) => {
    assert.ok(true, 'POST /users api called');

    return request.error({
      errors: [
        { detail: errorMessage }
      ]
    });
  });

  visit('/users/new');

  andThen(() => {
    click('button:contains(Create)');
  });

  andThen(() => {
    expectElement(`div.error:contains(${errorMessage})`);
    assert.equal(currentURL(), '/users/new', 'still on new route');
  });
});

skip("can exit new route without saving user", function(assert) {
  assert.expect(4);
  let firstName = "Thelonious", lastName = "Monk";

  stubRequest('get', '/users', (request) => {
    assert.ok(true, 'get /users api called');
    request.ok({ data: [ userData(firstName, lastName) ] } );
  });

  visit("/users/new");

  let newFirstName = "Louis", newLastName = "Armstrong";
  andThen(() => {
    fillIn("input[name=firstName]", newFirstName);
    fillIn("input[name=lastName]", newLastName);
    click("a:contains(Index)");
  });

  andThen(() => {
    assert.equal(currentURL(), '/users', 'redirected to index');
    expectElement(userInfo(firstName, lastName), 1);
    expectNoElement(userInfo(newFirstName, newLastName));
    //debugger;
  });
});

skip("can update user", function(assert) {
  let firstName = "Louis", lastName = 'Amstrong';

  stubRequest('GET', '/users', (request) => {
    assert.ok(true, 'GET /users api called');

    request.ok({ data: [ userData(firstName, lastName) ] } );
  });

  visit('/users');

  andThen(() => {
    expectElement('li a:contains(Edit)');
    click('a:contains(Edit)');
  });

  andThen(() => {
    assert.equal(currentURL(), "/users/1/edit");
  });

  let newFirstName = "Thelonious", newLastName = "Monk";
  andThen(() => {
    let firstNameField = find('input[name=firstName]')[0];
    let lastNameField = find('input[name=lastName]')[0];

    assert.equal(firstNameField.value, firstName);
    assert.equal(lastNameField.value, lastName);

    fillIn(firstNameField, newFirstName);
    fillIn(lastNameField, newLastName);

    stubRequest('PATCH', '/users/1', (request) => {
      assert.ok(true, 'PATCH api called');

      return request.ok({ data: userData(newFirstName, newLastName) });
    });

    stubRequest('GET', '/users', (request) => {
      assert.ok(true, 'GET /users api called');

      request.ok({ data: [ userData(newFirstName, newLastName) ] } );
    });

    click('button:contains(Update)');
  });

  andThen(() => {
    assert.equal(currentURL(), '/users', 'redirected to index');
    expectElement(userInfo(newFirstName, newLastName));
  });
});

skip("shows user update errors", function(assert) {
  assert.expect(3);

  let firstName = "Louis", lastName = 'Amstrong';
  stubRequest('GET', '/users/1', (request) => {
    assert.ok(true, 'GET /users api called');

    request.ok({ data: userData(firstName, lastName) } );
  });

  let errorMessage = "save failed";
  stubRequest('PATCH', '/users/1', (request) => {
    assert.ok(true, 'POST /users api called');

    return request.error({
      errors: [
        { detail: errorMessage }
      ]
    });
  });


  visit('/users/1/edit');

  andThen(() => {
    click('button');
  });

  andThen(() => {
    expectElement(`div.error:contains(${errorMessage})`);
  });
});
