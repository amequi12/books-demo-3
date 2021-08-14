import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | event/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:event/edit');
    assert.ok(route);
  });
});
