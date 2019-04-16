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
        userId: user.userId,
        username: user.username,
        avatar: user.avatar,
        name: user.name,
        background: user.background
    }
    const options = {
        expiresIn: moment().add(1, 'days').unix(),
        
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

const verifyUser = (userId) => {
    let query = db('User')
    return query
    .select('*')
    .where('userId', userId)
    .returning('userId')
}

module.exports = {
    findEmail,
    findUsername,
    createToken,
    verifyUser
}