const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const app = express();
app.use(bodyParser.json());

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user: 'blynn',
    password: 'cookies',
    database: 'nota-bene',
  }
});

app.get('/', (req, res) => {
	res.send('this is working');
})

app.post("/signin", (req, res) => { signin.signIn(req, res, db, bcrypt) });
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.post("/notes", (req, res) => { notes.syncNotes(req, res, db) });

app.listen(3001, () => {
	console.log('app is running on port 3001')
})

/*
/ --> working
/signin POST = success / fail
/register POST = returns new created user
/submit PUT = returns edited note
/delete PUT = returns success / fail
/new POST -->
*/