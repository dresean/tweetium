const db = require('../../db')

const incrementTweetCount = (userId) => {
    let query = db('User')
    return query
    .increment('tweets', 1)
    .where('userId', userId)
}

const postTweetWithImage = (content, userId, imageFile, req) => {
    let query = db('Tweet')
    return query
    .insert([
        {'user_id': userId}, 
        {'image': imageFile['location']}, 
        {'content': req.body.content},
        {'avatar': req.avatar},
        {'name': req.name},
        {'username': req.username}
        ], 
        ['tweetId', 'content', 'image']
    )
}


module.exports = { incrementTweetCount, postTweetWithImage }

