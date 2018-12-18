const syncNotes = (req, res, db) => {
	const { user, notes } = req.body;
	db.transaction(trx => {
		trx.schema.dropTableIfExists(user)
		.then(() => {
			return trx.schema.createTable(user, function (table) {
				  table.string('title');
				  table.string('body');
				  table.integer('key');
			})
			.then(() => {
            return trx(user)
            		.insert(notes)
            		.then(res.json('success'));
        	})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to sync'));	 
	
}

module.exports = {
	syncNotes: syncNotes
}