const db = require('../../db')
// todo
// get tweet content, image, dateadded, userid, user avatar, username, user.name,
// count likes, replies, retweets
// show hours, minutes, days, up to 2 weeks, or date posted

const getUserTweets = (userId) => {
    let query = db('Tweet')
    return query
    .select('content', 'image1', 'date')
    .where('user_id', userId)
}

get

module.exports = {

}