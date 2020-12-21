const registerHandling = (req, res, database, bcrypt) => {
        const {name, email, password} = req.body
     if(!name || !email || !password) {
        return res.status(400).json("Incorrect for submission")
    }

        const saltRounds = 10;
        const hashed = bcrypt.hashSync(password, saltRounds)

        database.transaction(trx => {
            trx.insert({
                email: email,
                hash: hashed
            }).into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            name: name,
                            email: loginEmail[0],
                            joined: new Date()
                        })
                        .then(user => {
                            res.json(user[0])
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
            .catch(err => res.status(400).json('unable to register'))

    }


module.exports ={
    registerHandling : registerHandling
}