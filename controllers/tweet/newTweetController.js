const db = require('../../db')

const checkDuplicate = (userId, content) => {
    let query = db('Tweet')
    return query
    .count('tweetId')
    .where('user_id', userId)
    .andWhere('content', content)
}
const newTweet = (request) => {
    let query = db('Tweet')
    return query
    .insert({
        'content': request.body.content,
        'user_id': request.userId,
        },
        ['user_id', 'tweetId', 'content']
        )
}

module.exports = {
    newTweet,
    checkDuplicate
}