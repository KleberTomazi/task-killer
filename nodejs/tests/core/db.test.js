const Db = require('../../core/db');
const assert = require('assert');

// describe (groups tests)
// it (does the test)
// before (run before all tests in a describe());
// after (run after all tests in a describe());
// before/afterEach (runs after or before every it() of a describe())

describe('Db', () => {
  it('teste de sanidade', () => {
    const db = new Db();

    assert(db);
    assert(db.knex);
  });

  it('teste de conexão', async () => {
    const db = new Db();
    const resultado = await db.knex.raw('select 1 as result');

    assert(resultado);
    assert(resultado.rows);

    assert.strictEqual(resultado.rows.length, 1);
    assert.strictEqual(resultado.rows[0].result, 1);
  });

  after(() => { return new Db().knex.destroy(); });
});