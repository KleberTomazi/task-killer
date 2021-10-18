require('./dotenv')

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.PSQL_HOST,
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DATABASE,
  }
};
console.log(module.exports);