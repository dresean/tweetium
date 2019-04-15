const db = require('../../db')

const incrementTweetCount = (userId) => {
    let query = db('User')
    return query
    .where('userId', userId)
    .increment('tweets', 1)
}

const postTweetWithImage = (content, userId, image)