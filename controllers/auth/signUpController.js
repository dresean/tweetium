const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../db')
const secret = process.env.JWT_SECRET
let salt = process.env.SALT

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

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, Number(salt), (err, hash) => {
            err ? reject(err) : resolve(hash)
        })
    })
}

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

const createUser = (request) => {
    let query = db('User')
    return query
    .returning(['userId', 'email'])
    .insert(request)
    
}

module.exports = {
    findEmail,
    createToken,
    createUser,
    hashPassword,
    findUsername
}