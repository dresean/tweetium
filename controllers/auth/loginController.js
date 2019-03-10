const db = require('../../db')
const bcrypt = require('bcrypt')

const verifyPassword = (passwordGuess, user) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passwordGuess, user.password, (err, response) => {
            err ? reject(err) : resolve(response)
        })
    })
}

const getUserByEmail = (email) => {
    let query = db('User')
    return query
    .where('User.email', email)
    .first()
}

module.exports = {
    getUserByEmail,
    verifyPassword
}