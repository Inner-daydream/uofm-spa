const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router()
const Controller = require('../controllers/index')

router.get('/version', auth, (req, res) => {
    const API_VERSION = process.env.API_VERSION
    res.send('API Version: ' + API_VERSION)
})
router.post('/user', Controller.UserController.newUser)
router.post('/login', Controller.UserController.login)



module.exports = router;