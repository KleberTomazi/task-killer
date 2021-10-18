const Context = require('../../../core/context')
const UserModel = require('../../../core/models/user')

const assert = require('assert');

// describe (groups tests)
// it (does the test)
// before (run before all tests in a describe());
// after (run after all tests in a describe());
// before/afterEach (runs after or before every it() of a describe())

describe('user model', () => {
  it('teste de sanidade', () => {
    const userModel = new UserModel(new Context());

    assert(userModel);
    assert(userModel.context);
    assert(userModel.db);
  });

  it('teste de criação', async () => {
    const userModel = new UserModel(new Context());
    const email = `${Math.random()}@teste.com`;

    const user = await userModel.create('Name', email, '123');

    console.log("Usuário:", user);

    assert(user);
    assert(user.id);

    await userModel.db.knex('users').where({ email }).del();
  });

  after(() => new Context().db.knex.destroy());
});