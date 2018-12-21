const handleRegister = (req, res, db, bcrypt) => {
	const { name, password } = req.body;
	if (!name || !password) {
		return res.status(400).json("Please enter a name and password");
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			name: name
		})
		.into('login')
		.returning('name')
		.then(user => {
			return trx.schema.createTable(user[0], function (table) {
				  table.integer('id');
				  table.string('title');
				  table.string('body');
				})
			.then(table => res.json(table))
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Unable to register: Name may be in use'));	 
}

module.exports = {
	handleRegister: handleRegister
}