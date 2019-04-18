const db = require('../../db')


const deleteTweet = (tweetId, userId) => {
    let query = db('Tweet')
    return query
    .del()
    .where('tweetId', tweetId)
    .andWhere('user_id', userId)
}

const checkIfTweetExists = (tweetId, userId) => {
    let query = db('Tweet')
    return query
    .select('*')
    .where('tweetId', tweetId)
    .andWhere('user_id', userId)
}
const decrementTweetCount = (userId) => {
    let query = db('User')
    return query
    .where('userId', userId)
    .decrement('tweets', 1)
}

module.exports = {
    deleteTweet,
    decrementTweetCount,
    checkIfTweetExists
}