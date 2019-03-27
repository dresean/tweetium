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
    .select('*')
    .where('User.email', email)
}

module.exports = {
    getUserByEmail,
    verifyPassword
}