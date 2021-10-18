const Db = require('./db');
const UserModel = require('./models/user');

// ideally it should contains;
//  - db
//  - models
//  - app specific data

class Context {
  constructor() {
    this.db = new Db();
    this.user = new UserModel(this);
  }
}

module.exports = Context;