const Context = require('../../core/context')
const assert = require('assert');

// describe (groups tests)
// it (does the test)
// before (run before all tests in a describe());
// after (run after all tests in a describe());
// before/afterEach (runs after or before every it() of a describe())

describe('context', () => {
  it('teste de sanidade', () => {
    const ctx = new Context();

    assert(ctx);
    assert(ctx.db);
  });
});