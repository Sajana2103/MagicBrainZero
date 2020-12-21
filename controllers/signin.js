const handleSignin = (req,res,database,bcrypt) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(400).json("Incorrect for submission")
    }

    database.select('email','hash').from('login')
        .where('email',req.body.email)
        .then(data => {
            const isValid =bcrypt.compareSync(req.body.password,data[0].hash)
            if (isValid) {
                database.select('*').from('users')
                    .where('email',req.body.email)
                    .then(user => {
                        res.json(user[0])
                    }).catch(err => res.status(400).json("Email or password is incorrect"))
            } else {res.status(400).json("Email or password is incorrect") }
        })
     .catch(err =>  res.status(400).json("Error login in"))

}

module.exports = {
    handleSignin : handleSignin
}