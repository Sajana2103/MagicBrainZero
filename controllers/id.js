const handleId = (req,res,database) => {
    const {id} = req.params
    database.select('*').from('users').where({id})
        .then(user =>
        {

            console.log(user)
            if( user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('No such user')
            }
    })
        .catch(err => res.status(400).json('Error'))

}
module.exports = {
    handleId : handleId
}