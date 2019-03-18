const db = require('../db')


const getTweetCount = (userId) => {
    let query = db('Tweet')
    return query
    .count('tweetId')
    .where('user_id', userId)
}

const getUserTweets = userId => {
    let query = db('Tweet')
    return query.as('t')
    .select(
        't.likes',
        't.retweets',
        't.replies',
        't.content',
        't.created_at',
        't.image',
        'u.username',
        'u.name',
        'u.avatar',
        )
    .where('user_id', userId)
    .leftJoin('User', 'User.userId', 'Tweet.user_id')
    .as('u')

}

module.exports = {
    getTweetCount
}

// .leftJoin('User', 'User.userId', 't.user_id')
// .as('u')
// .leftJoin('Like', 'Like.tweet_id', 'tweetId')
// .as('l')
// .leftJoin('Retweet', 'Retweet.tweet_id', 't.tweetId')
// .as('r')
// .count('l.likeId')
// .as('likes')
// .count('r')