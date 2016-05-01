/* eslint-env node */
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import cookieParser from 'cookie-parser';
import jsonServer from 'json-server';
import config from './config';
import jwtToken from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import passport from 'passport';
// import expressSession from 'express-session';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/staty', {db: {safe: true}});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('DB CONNECTED!');
  // yay!
});

const jsonPath = path.join(__dirname, 'data.json');
const app = express();

app.use(jsonServer.defaults);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(jwt({
  secret: config.token.secret
}).unless(req => {
  const url = req.originalUrl;
  const postsRE = /^\/posts(\/.*)?$/;
  const leaguesRE = /^\/leagues(\/.*)?$/;
  const apiRE = /^\/api(\/.*)?$/;
  const loginRE = /^\/login(\/.*)?$/;
  const callbackloginRE = /^\/callbacklogin(\/.*)?$/;

  return (
      url === '/signup' ||
      url === '/login' ||
      (postsRE).test(url) && req.method === 'GET' ||
      (leaguesRE).test(url) && req.method === 'GET' ||
      (loginRE).test(url) && req.method === 'GET' ||
      (callbackloginRE).test(url) && req.method === 'GET' ||
      (apiRE).test(url) && (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT')
  );
}));

app.use(function (err, req, res, next) {
  
  if (err.name === 'UnauthorizedError') {
    console.log('UnauthorizedError path', req.originalUrl);
    res.send(401, 'invalid token...', req.originalUrl);
  }
});

// Configuring passport
// app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
// app.use(passport.session());
let initPassport = require('./passport/init');
initPassport(passport);


import api from './api';
app.use('/api', api);
import passportRoutes from './passport/routes';
app.use('/', passportRoutes(passport));

function generateToken(email, password) {
  const payload = { email, password };
  return jwtToken.sign(payload, config.token.secret, {
    expiresInMinutes: config.token.expires
  });
}

function extractToken(header) {
  return header.split(' ')[1];
}

// here comes the real hardcode
const HARDCODED_EMAIL = 'email@adress';
const HARDCODED_PASSWORD = 'pass';
const HARDCODED_USER = {
  id: 4,
  email: 'email@adress',
  leagueName: 'mofufus',
  password: 'pass'
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
    const token = generateToken(email, password);
    const user = HARDCODED_USER;
    res.send({ token, user });
  } else {
    res.sendStatus(401);
  }
});

app.get('/profile', (req, res) => {
  try {
    const token = extractToken(req.headers.authorization);
    const decode = jwtToken.decode(token);
    const { email } = decode;
    fs.readFile(jsonPath, {
      encoding: 'utf-8'
    }, (error, db) => {
      const users  = (JSON.parse(db)).users;
      const user = _.find(users, (user) => user.email === email);
      res.send(user);
    });
  } catch (error) {
    res.sendStatus(401);
  }
});


app.put('/profile', (req, res) => {
  try {
    const token = extractToken(req.headers.authorization);
    const decode = jwtToken.decode(token);
    const { email } = decode;

    fs.readFile(jsonPath, {
      encoding: 'utf-8'
    }, (error, db) => {
      let editedUser;

      const json = JSON.parse(db);

      const users  = json.users.map(user => {
        if (user.email === email) {
          return (editedUser = { ...user, ...req.body });
        }

        return user;
      });

      if (!editedUser) res.sendStatus(404);

      json.users = users;

      fs.writeFile(jsonPath, JSON.stringify(json, null, '  '), err => {
        if (err) return res.sendStatus(500);

        res.send(editedUser);
      });
    });
  } catch (error) {
    res.sendStatus(401);
  }
});

app.use(jsonServer.router(jsonPath));
// export default app;
app.listen(1337);
