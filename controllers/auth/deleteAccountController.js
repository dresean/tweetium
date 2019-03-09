const db = require('../../db')

const deleteUser = (userId) => {
    let query = db('User')
    return query
    .where('userId', userId)
    .delete()
}

module.exports = { deleteUser }