const BaseModel = require('./base');
const bcrypt = require('bcrypt');

class UserModel extends BaseModel {
  async create(name, email, password) {
    const hashedPassword = await bcrypt.hashSync(password, 7);

    const rows = await this.db.knex('users').insert({
      name,
      email,
      password: hashedPassword
    }).returning('*');

    return rows[0];
  }
}

module.exports = UserModel;