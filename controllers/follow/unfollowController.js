const db = require('../../db')


const checkIfFollowing = (followerId, followedId) => {
    let query = db('Follow')
    return query
    .select('*')
    .where('follower_id', followerId)
    .andWhere('followed_id', followedId)
}

const unfollow = (followerId, followedId) => {
    let query = db('Follow')
    return query
    .where('follower_id', followerId)
    .andWhere('followed_id', followedId)
    .delete()
}

const decrementFollowers = (followedId) => {
    let query = db('User')
    return query
    .where('User.userId', followedId)
    .decrement('followers', 1)
}

const decrementFollowing = (followerId) => {
    let query = db('User')
    return query
    .where('User.userId', followerId)
    .decrement('following', 1)
}

module.exports = {
    checkIfFollowing,
    unfollow,
    decrementFollowers,
    decrementFollowing
}
