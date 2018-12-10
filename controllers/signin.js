const signIn = (req, res, db, bcrypt) =>  {
	const { name, password } = req.body;
	if (!name || !password) {
		return res.status(400).json("improper form submit");
	}
	db.select('name', 'hash')
	.from('login')
	.where('name', '=', name)
	.then(user => {
		isValid = bcrypt.compareSync(password, user[0].hash);
		if (isValid) {
			return db.select('*').from(name)
			  .then(notes => {
			  	res.json(notes);
			  })
			  .catch(err => {
			  	res.status(400).json('wrong credentials');
			  })
		}
		res.status(400).json('wrong credentials');	
	})
	.catch(err => {
	 	res.status(400).json('wrong credentials');
	})
}

module.exports = {
	signIn: signIn
}