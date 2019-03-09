const db = require('../../db')

// todo
// get followers, following, tweets, with likes count, retweets count, and replies count

const follwerCount = (userId) => {
    let query = db('Follow')
    return query
    .count()
    .where('followed_id', userId)
}

const tweetCount = (userId) => {
    let query = db('Tweet')
    return query
    .count()
    .where('user_id', userId)
}

const followingCount = (userId) => {
    let query = db('Follow')
    return query
    .count()
    .where('follower_id', userId)
}

const getUserTweets = (userId) => {
    let query = db('Tweet')
    return query
    .select('')
    .where('user_id', userId)
    .leftJoin('likes', 'tweetId', 'likes.tweet_id')
    .leftJoin
}
module.exports = {
    followingCount,
    follwerCount,
    getUserTweets,
    tweetCount,
}