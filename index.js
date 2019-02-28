const express = require('express')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const port = process.env.PORT || 5000
const signupRoute = require('./routes/auth/signupRoute')
require('dotenv').config()

const Router = express.Router()
const server = express()
const path = require('path')
const db = require('./db')


server.use(cors())
server.use(express.json())
// server.use(express.static(path.join(__dirname, 'ui/build')));
server.use(morgan('dev'))
server.use(compression())

server.use(signupRoute)
// server.get('/', (req, res) => {
//     res.status(200).json({Message: 'server up and running!'})
// })

// server.get('/api', (req, res) => {
//     res.status(200).json({Message: 'paths working fine!'})
// })

// server.get('/users', (req, res) => {
//     return getUsersController()
//     .then(users => {
//         console.log('Users fetched! \n', users)
//         res.status(200).json(users)
//     })
//     .catch(err => {
//         console.log('Users not found! \n', err)
//         res.status(404).json(err)
//     })
// })

// server.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/ui/build/index.html'));
// });

server.listen(port, () => {
    console.log(`server listening to ${port} \n\n\n`)
})