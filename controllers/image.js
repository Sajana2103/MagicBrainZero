const Clarifai = require('clarifai')

const app = new Clarifai.App({apiKey: '038f9c26445f4de48efbc1ef306fb2d0'});

const handleAPI = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => { res.json(data)
        })
    .catch(err => { res.status(400).json('Unable to read data')})
}


const handleImage =(req, res,database) => {
    const {id} = req.body
    database('users').where('id','=',id)
        .increment('entries',1)
        .returning('entries')
        .then(entries => { res.json(entries)})
        .catch(err => res.status(400).then(res.json('Unable to increment entries.')))
}

module.exports ={
    handleImage: handleImage,
    handleAPI : handleAPI
}