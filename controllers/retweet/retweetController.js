const db = require('../../db')

// TODO :
/*
if retweeted tweet contains media, only fetch the username, name,
media as thumbnail and the content

if tweet contains no media, fetch avatar, username, replying to username
date created, like count, comment count, retweetcount and dm option
*/
/*
if retweeting without comment, get entire user tweet
get user: avatar, name, username, replying to (optional)
get tweet:
*/
const getTweetInfo = (tweetId) => {
    let query = db('Tweet')
    return query
    .as('t')
    .select('u.username', 'u.name', 'u.avatar', 't.content', 't.likes', 't.retweets', 't.replies', 't.created_at')
    .leftJoin('User', 't.user_id', 'u.userId').as('u')
    .where('t.tweetId', tweetId)
}


module.exports = { getTweetInfo }
/*
SELECT u.username, u.name, u.avatar,
t.content, t.likes, t.retweets, t.replies, t.created_at
FROM Tweet as 't'
LEFT JOIN User AS 'u'
ON t.user_id = u.userId
WHERE t.tweetId = tweetId

*/