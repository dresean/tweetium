const db = require('../../db')


const deleteTweet = (tweetId, userId) => {
    let query = db('Tweet')
    return query
    .where('tweetId', tweetId)
    .andWhere('user_id', userId)
    .del()
}

module.exports = {
    deleteTweet
}