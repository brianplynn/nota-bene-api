const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const notes = require('./controllers/notes');

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('this is working');
})

app.post("/signin", (req, res) => { signin.signIn(req, res, db, bcrypt) });
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.put("/notes", (req, res) => { notes.syncNotes(req, res, db) });

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})

/*
/ --> working
/signin POST = success / fail
/register POST = returns new created user
/submit PUT = returns edited note
/delete PUT = returns success / fail
/new POST -->
*/