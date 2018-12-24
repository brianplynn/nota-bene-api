const signIn = (req, res, db, bcrypt) =>  {
	const { name, password } = req.body;
	if (!name || !password) {
		return res.status(400).json("Please enter a name and password");
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
			  	res.status(400).json('Wrong credentials. Please try again');
			  })
		}
		res.status(400).json('Wrong credentials. Please try again');	
	})
	.catch(err => {
	 	res.status(400).json('Wrong credentials. Please try again');
	})
}

module.exports = {
	signIn: signIn
}