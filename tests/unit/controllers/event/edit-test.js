import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | event/edit', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:event/edit');
    assert.ok(controller);
  });
});