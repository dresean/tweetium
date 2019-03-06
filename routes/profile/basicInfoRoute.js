const express = require('express')
const Router = express.Router()

Router
.post('/basicInfo', (req, res) => {
    const { name, bio, tagline } = req.body
        
})


module.exports = Router