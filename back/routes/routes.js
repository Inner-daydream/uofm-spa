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
router.post('/logout', Controller.UserController.logout)
router.get('/user/info', auth, Controller.UserController.getUserInfo)


module.exports = router;


router.post("/image", auth, upload.single("image"), Controller.ImageController.newImage)
router.get("/image", auth, Controller.ImageController.getImage)
router.get("/image/user", auth, Controller.ImageController.getUserImages)
router.delete("/image/:id", auth, Controller.ImageController.deleteImage)
