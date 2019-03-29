const db = require('../../db')

const findUser = (followedId) => {
    let query = db('User')
    return query
    .select('*')
    .where('User.userId', followedId)
}

// checks to see if the followerId already exists with the followingId
const checkDuplicateFollow = (followerId, followedId) => {
    let query = db('Follow')
    return query
    .select('*')
    .where('followed_id', followedId)
    .andWhere('follower_id', followerId)
}

// adds a new follower, returning the followId
const insertFollower = (followerId, followedId) => {
    let query = db('Follow')
    return query
    .insert([{'followed_id': followedId, 'follower_id': followerId}], 'followId')
}

// adds 1 to following on the User table
const incrementFollowing = followerId => {
    let query = db('User')
    return query
    .where('User.userId', followerId)
    .increment('following', 1)
}

// adds 1 to followers on the User table
const incrementFollowers = followedId => {
    let query = db('User')
    return query
    .where('User.userId', followedId)
    .increment('followers', 1)
}

module.exports = {
    checkDuplicateFollow,
    incrementFollowers,
    incrementFollowing,
    insertFollower,
    findUser
}