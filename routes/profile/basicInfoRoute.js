const express = require('express')
const Router = express.Router()
// const { updateProfile } = require('../../controllers/profile/basicInfoController')
const { clientError, serverError, success, redirection } = require('../../utils/statusCodes')
const db = require('../../db')

Router
.put('/user/:username/settings/basic-info', (req, res) => {
    const username = req.params.username
    const userId = req.userId
    const { tagline, bio, name } = req.body

    if(!tagline && !bio && !name) {
        res
        .status(clientError.badRequest)
        .json({
            Message: 'No changes were made! Please fill out a field to update your profile.'
        })
    }
    if(username !== req.username) {
        res
        .status(clientError.unauthorized)
        .json({
            Message: 'You are not authorized to do that. Please try again.'
        })
    }
    let query = db('User')

    return query
    .where('username', username)
    .update(req.body, ['name', 'bio', 'tagline'])
    .then(response => {
        res
        .status(success.ok)
        .json({
            Message: 'Successfully updated your profile!',
            response
        })
    })
    .catch(err => {
        console.log('There was an error \n\n\n\n', err)
        res
        .status(serverError.internalServerError)
        .json({
            Message: 'There was a problem updating your profile, please try again.'
        })
    })
})


module.exports = Router