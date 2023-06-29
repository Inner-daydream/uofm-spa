const express = require('express');
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const router = express.Router()
const Controller = require('../controllers/index')

router.get('/version', (req, res) => {
    const API_VERSION = process.env.API_VERSION
    res.send('API Version: ' + API_VERSION)
})
router.post('/user', Controller.UserController.newUser)
router.post('/login', Controller.UserController.login)
router.get('/user/info', auth, Controller.UserController.getUserInfo)


module.exports = router;

router.post("/image", auth, upload.single("image"), (req, res) => {
    if (req.file) {
        res.status(200).json({
            message: 'Image uploaded successfully',
            link: process.env.BACKEND_URL + '/' + req.file.filename,
        });
    } else {
        res.status(400).send("Please upload a valid image");
    }
});