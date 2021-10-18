require('./dotenv')

const express = require('express');
const bodyParser = require('body-parser');

const logger = require('../core/logger');
const Context = require('../core/context');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello!'));

app.post('/users/create', async (req, res) => {
  const ctx = new Context();
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ ok: false, message: 'Missing required info' });
  }

  try {
    const user = await ctx.user.create(name, email, password);
    res.status(201).send({ ok: true, message: 'User created' });
  } catch (ex) {
    if (ex.code === '23505') {
      res.status(400).send({
        ok: false,
        message: 'Email already exists'
      });
      return;
    }
    logger.error(ex);
    res.status(500).send({ ok: false, message: ex.message });
  }
});

app.listen(process.env.HTTP_PORT, () => {
  logger.info(`Server is listening on port ${process.env.HTTP_PORT}`);
});