const db = require('../../db')


const getTweet = (tweetId) => {
  let query = db('Tweet')
  return query
    .select('*')
    .where('tweetId', tweetId)
}

const getReply = (replyId) => {
    let query = db('Reply')
    return query
        .select('*')
        .where('replyId', replyId)
}

const getRetweet = (retweetId) => {
    let query = db('Retweet')
    return query
    .select('*')
    .where('retweetId', retweetId)
}

const postRetweet = (req, tweet) => {
    let query = db('Retweet')
    return query
    .insert({
        'user_id': req.userId, 
        'tweetId': tweetId, 
        'reply_id': replyId, 
        'retweet_id': retweetId,
        'content': req.body, 
        'avatar': avatar, 
        'username': username, 
        'name': name, 
        'rtAvatar': tweet.avatar, 
        'rtUsername': tweet.username, 
        'rtName': tweet.name, 
        'rtContent': tweet.content
    })
}

module.exports = { 
    getTweet, 
    getReply, 
    getRetweet, 
    postRetweet
}
