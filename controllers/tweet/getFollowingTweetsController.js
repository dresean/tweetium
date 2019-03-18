const db = require('../../db')

const findFollowingTweets = (userId) => {
   let query = db('Follow')
   return query
   .select(
       'User.username',
       'User.avatar',
       'User.name',
       'Tweet.likes',
       'Tweet.replies',
       'Tweet.retweets',
       'Tweet.content',
       'Tweet.created_at',
       'Tweet.image')
   .where('follower_id', userId)
   .leftJoin('User', 'User.userId', 'Follow.followedId')
   .leftJoin('Tweet', 'Tweet.user_id', 'Follow.followedId')
}

module.exports = {
 findFollowingTweets
}