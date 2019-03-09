const db = require('../../db')

const updateProfile = (request) => {
    let query = db('User')
    .where('userId', request.userId)
    .insert(request)
    .returning(['username, bio, name, tagline'])
}

module.exports = {
    updateProfile
}