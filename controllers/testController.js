const db = require('../db')


const getTweetCount = (userId) => {
    let query = db('Tweet')
    return query
    .count('*')
    .where('user_id', userId)
}

module.exports = {
    getTweetCount
}