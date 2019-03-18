const db = require('../../db')

const newLike = (userId, tweetId) => {
     let query = db('Like')
     return query
     .insert({
         'tweet_id': tweetId,
         'user_id': userId
     })
}