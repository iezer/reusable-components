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
  stubRequest('get', '/users', (request) => {
    assert.ok(true, 'get /users api called');

    request.ok({ data: [ userData(firstName, lastName) ] });
  });

  visit('/users');
  andThen(() => {
    assert.equal(currentURL(), '/users');
    expectElement(userInfo(firstName, lastName));
  });
});

test("can create new user", function(assert) {
  assert.expect(4);
  let firstName = "Thelonious", lastName = "Monk";
  stubRequest('POST', '/users', (request) => {
    assert.ok(true, 'POST /users api called');
    request.created({ data: userData(firstName, lastName) } );
  });

  stubRequest('get', '/users', (request) => {
    assert.ok(true, 'get /users api called');
    request.ok({ data: [ userData(firstName, lastName) ] } );
  });

  visit("/users/new");

  andThen(() => {
    fillIn("input[name=firstName]", firstName);
    fillIn("input[name=lastName]", lastName);
    click("button:contains(Submit)");
  });

  andThen(() => {
    assert.equal(currentURL(), '/users', 'redirected to index');
    expectElement(userInfo(firstName, lastName));
  });
});

test("can go back to index", function(assert) {
  assert.expect(3);
  let firstName = "Thelonious", lastName = "Monk";

  stubRequest('get', '/users', (request) => {
    assert.ok(true, 'get /users api called');
    request.ok({ data: [ userData(firstName, lastName) ] } );
  });

  visit("/users/new");

  andThen(() => {
    fillIn("input[name=firstName]", firstName);
    fillIn("input[name=lastName]", lastName);
    click("a:contains(Index)");
  });

  andThen(() => {
    assert.equal(currentURL(), '/users', 'redirected to index');
    expectElement(userInfo(firstName, lastName), 1);
  });
});

test("shows user creation errors", function(assert) {
  assert.expect(2);
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
    click('button');
  });

  andThen(() => {
    expectElement(`div.error:contains(${errorMessage})`);
  });
});

test("can update user", function(assert) {
  let firstName = "Louis", lastName = 'Amstrong';
  let newFN = "Thelonious", newLN = "Monk";

  stubRequest('GET', '/users', (request) => {
    assert.ok(true, 'GET /users api called');

    request.ok({ data: [ userData(firstName, lastName) ] } );
  });

  stubRequest('PATCH', '/users/1', (request) => {
    assert.ok(true, 'GET /users api called');

    request.ok({ data: userData(firstName, lastName) } );
  });

  visit('/users');

  andThen(() => {
    expectElement('li a:contains(Edit)');
    click('a:contains(Edit)');
  });

  andThen(() => {
    assert.equal(currentURL(), "/users/1/edit");
    fillIn("input[name=firstName]", newFN);
    fillIn("input[name=lastName]", newLN);

    stubRequest('GET', '/users/', (request) => {
      assert.ok(true, 'GET /users api called');
      request.ok({ data: [ userData(newFN, newLN) ] } );
    });

    click("button:contains(Update)");
  });

  andThen(() => {
    assert.equal(currentURL(), '/users');
    expectElement(userInfo(newFN, newLN));
  });
});

test("shows user update errors", function(assert) {
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
