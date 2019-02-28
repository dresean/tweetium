const bcrypt = require('bcrypt')
const db = require('../../db')

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, Number(salt), (err, hash) => {
            err ? reject(err) : resolve(hash)
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
    createUser,
    hashPassword,
}