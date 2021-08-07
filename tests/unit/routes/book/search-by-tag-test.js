import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | book/search-by-tag', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:book/search-by-tag');
    assert.ok(route);
  });
});
