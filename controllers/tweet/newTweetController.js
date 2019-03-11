const db = require('../../db')

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
    newTweet
}