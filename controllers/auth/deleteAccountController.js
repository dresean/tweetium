const db = require('../../db')

// if userId valid with Authorization, delete
const deleteUser = (userId) => {
    let query = db('User')
    return query
    .where('userId', userId)
    .delete()
}

module.exports = { deleteUser }