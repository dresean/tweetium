const db = require('../../db')

const incrementTweetCount = (userId) => {
    let query = db('User')
    return query
    .increment('tweets', 1)
    .where('userId', userId)
}

const postTweetWithImage = (content, userId, imageUrl, req) => {
    let query = db('Tweet')
    return query
    .insert([
        {'user_id': userId}, 
        {'image': imageUrl}, 
        {'content': req.body.content}
        ], 
        ['tweetId', 'content', 'image']
    )
}


module.exports = { incrementTweetCount, postTweetWithImage }


// TODO set up jwt with user avatar available in req object