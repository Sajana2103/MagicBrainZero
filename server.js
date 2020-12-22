const express = require('express')
const fs = require('fs')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs')

const knex = require('knex')
const pg = require('pg')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const id = require('./controllers/id')
const image = require('./controllers/image')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const database = knex({
  client: 'pg',
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true
  }
});
database.select('id', 'email', 'name')
    .from('users').then(data => {
    console.log(data)
})



app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.get('/', (req,res) =>{
/*
    database.select('*').from('users')
        .then(users => {
            res.json(users)
        })

*/
    res.json('it is working')
})

app.get('/profile/:id', (req,res) =>{
    id.handleId(req,res,database)
})

app.put('/image', (req,res) =>{
    image.handleImage(req,res,database)
})

app.post('/signin',(req,res) => {
    signin.handleSignin(req,res,database,bcrypt)
})

app.post('/register', (req,res) => {
    register.registerHandling(req,res,database,bcrypt)
})

app.post('/imageurl', (req,res) =>
image.handleAPI(req,res))



app.listen(process.env.PORT || 3000,()=>{
    console.log(`Connected on port 3000 ${process.env.PORT}`)
})


// res --> this is working
// signin --> POST (success or fail)
// Register --> POST = user
// profile/:userId - -> GET user
// image --> PUT(update) user image count