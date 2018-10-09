const axios = require('axios');
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");

const { authenticate, generateToken } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
}

function register(req, res) {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 18);
  user.password = hash;
  db("users")
    .insert(user)
      .then(ids => {
        db("users")
          .where({ id: ids[0] })
          .first()
          .then(user => {
            const token = generateToken(user);

            res.status(201).json(token);
          });
      })
    .catch(error => {
      res.status(500).json({ msg:`${error}` })
    })
}

function login(req, res) {
  const credentials = req.body;
  db('users')
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        // res.send(token);
    }
      else {return res.status(401).json({ message: "Login info incorrect, please try again" })
    }
  })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong", error: error })
  })
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
