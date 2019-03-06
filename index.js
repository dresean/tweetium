const express = require('express')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const port = process.env.PORT || 5000
const registerRoute = require('./routes/auth/registerRoute')
const loginRoute = require('./routes/auth/loginRoute')
const withAuth = require('./middleware/authorization')
const logoutRoute = require('./routes/auth/logoutRoute')
// const cookieParser = require('cookie-parser')
require('dotenv').config()

const Router = express.Router()
const server = express()
const path = require('path')
const db = require('./db')


const getAllUsers = () => {
    let query = db('User')
    return query
    .select('*')
}

// Middleware and tools
server.use(cors())
server.use(express.json())
// server.use(express.static(path.join(__dirname, 'ui/build')));
server.use(morgan('dev'))
server.use(compression())
// server.use(cookieParser())

// Routes
server.use(loginRoute)
server.use(registerRoute)
server.use(logoutRoute)


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