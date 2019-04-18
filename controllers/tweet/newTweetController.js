const db = require('../../db')

const checkDuplicate = (userId, content) => {
    let query = db('Tweet')
    return query
    .count('tweetId')
    .where('user_id', userId)
    .andWhere('content', content)
}

const incrementTweetCount = userId => {
    let query = db('User')
    return query
    .where('userId', userId)
    .increment('tweets', 1)
}
const newTweet = (request, name, avatar, username) => {
    let query = db('Tweet')
    return query
    .insert({
        'content': request.body.content,
        'user_id': request.userId,
        'name': name,
        'avatar': avatar,
        'username': username,
        })
        .returning(['user_id', 'tweetId', 'content', 'name', 'avatar'])
}

module.exports = {
    newTweet,
    checkDuplicate,
    incrementTweetCount
}