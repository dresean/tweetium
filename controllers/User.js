const db = require('../db')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
let salt = process.env.SALT

//TODO add 
//audience with regular expression
// maxAge for days logged in option
//
// See https://www.npmjs.com/package/jsonwebtoken

const createToken = (user) => {
    const payload = {
        email: user.email,
        id: user.userId,
    }
    const options = {
        expiresIn: '1d',
        
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