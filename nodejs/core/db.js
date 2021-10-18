const knex = require('knex')(require('../knexfile'));

class Db {
  get knex() { return knex; }
}

module.exports = Db;