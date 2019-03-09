const bcrypt = require('bcrypt')
const db = require('../../db')
const salt = process.env.SALT

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, Number(salt), (err, hash) => {
            err ? reject(err) : resolve(hash)
        })
    })
}

//todo delete returning value
const createUser = (request) => {
    let query = db('User')
    return query
    .returning(['email', 'username'])
    .insert(request)
}

module.exports = {
    createUser,
    hashPassword,
}