const db = require('../db')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
let salt = process.env.SALT
const moment = require('moment')

//TODO add 
//aud with regular expression matching routes
//sub
//iss
// See https://www.npmjs.com/package/jsonwebtoken

const createToken = (user) => {
    const payload = {
        email: user.email,
        id: user.userId,
        username: user.username
    }
    const options = {
        expiresIn: moment().add(14, 'days').unix(),
        
    }
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            err ? reject(err) : resolve(token)
        })
    })
}

const findEmail = (email) => {
    let query = db('User')
    return query
    .where('User.email', email)
    .select('*')
}

const findUsername = (username) => {
    let query = db('User')
    return query
    .where('User.username', username)
    .select('*')
}

module.exports = {
    findEmail,
    findUsername,
    createToken
}