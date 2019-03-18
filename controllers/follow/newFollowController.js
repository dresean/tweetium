const db = require('../../db')

const checkDuplicateFollow = (followerId, followingId) => {
    let query = db('Follow')
    return query
    .select()
    .where('followed_id', followingId)
    .andWhere('follower_id', userId)
}

module.exports = {

}