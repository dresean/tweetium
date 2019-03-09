const express = require('express')
const Router = express.Router()
const { clientError, serverError, success } = require('../../utils/statusCodes')
const { updateProfile } = require('../../controllers/profile/basicInfoController')
const { verifyUser } = require('../../controllers/UserController')

// Todo make user route to verify editing
Router
.post('/:user/basicInfo', (req, res) => {
    const { name, bio, tagline } = req.body
    if(!name && !bio && !tagline) {
        res
        .status(clientError.badRequest)
        .json({
            Message: "No changes were made, please fill out a field to update it."
        })
    }
    return updateProfile(req.body)
    .then(response => {
        console.log(`the response: from ${response.username}`, response)
        res
        .status(success.created)
        .json({
            Message: "Successfully updated your profile information!"
        })
    })
    .catch(err => {
        console.log("This is the error", err)
        res
        .status(serverError.internalServerError)
        .json({
            Message: "There was a problem updating your information, please try again later"
        })
    })
})


module.exports = Router