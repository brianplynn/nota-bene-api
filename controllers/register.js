const handleRegister = (req, res, db, bcrypt) => {
	const { name, password } = req.body;0
	if (!name || !password) {
		return res.status(400).json("improper form submit");
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			name: name
		})
		.into('login')
		.returning('name')
		.then(userName =>{
			return trx.schema.createTable(userName, table => {
				table.increments();
				table.string('title');
				table.string('body');
			})
			.then(user => res.json(user[0]));
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'));	 
}

module.exports = {
	handleRegister: handleRegister
}