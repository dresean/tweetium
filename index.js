// Dependencies
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()

// Routes
const registerRoute = require('./routes/auth/registerRoute')
const loginRoute = require('./routes/auth/loginRoute')
const withAuth = require('./services/authorization')
const logoutRoute = require('./routes/auth/logoutRoute')
const userProfileRoute = require('./routes/profile/userProfileRoute')
const deleteAccountRoute = require('./routes/auth/deleteAccountRoute')
const basicInfoRoute = require('./routes/profile/basicInfoRoute')
const newTweetRoute = require('./routes/tweet/newTweetRoute')

// variables and modules
const port = process.env.PORT || 5000
const Router = express.Router()
const server = express()
const db = require('./db')

// for auth testing
const getAllUsers = () => {
    let query = db('User')
    return query
    .select('*')
}

// Middleware and tools
server.use(cors())
server.use(express.json({limit: '1mb'}))
// server.use(express.static(path.join(__dirname, 'ui/build')));
server.use(morgan('dev'))
server.use(compression())


// Routes
server.use(loginRoute)
server.use(registerRoute)
server.use(logoutRoute)
server.use(userProfileRoute)
server.use('/', withAuth, deleteAccountRoute)
server.use('/', withAuth, basicInfoRoute)
server.use('/', withAuth, newTweetRoute)


server.get('/', (req, res) => {
    res.status(200).json({Message: 'server up and running!'})
})

server.get('/users', withAuth, (req, res) => {
    return getAllUsers()
    .then(users => {
        console.log('users', users)
        res.status(200).json(users)
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({
            Message: "No users found"
        })
    })
})

server.get('/api', (req, res) => {
    res.status(200).json({Message: 'paths working fine!'})
})


server.listen(port, () => {
    console.log(`server listening to ${port} \n\n\n`)
})