const Service = require('../services/index.js');
const newImage = async (req, res, next) => {
    const imageInfo = req.body;
    if (imageInfo.name && imageInfo.description && req.file && req.user.username) {
        try {
            const imageLink = process.env.BACKEND_URL + '/' + req.file.filename;
            await Service.ImageService.upload(imageInfo.name, imageInfo.description, imageLink, req.user.username);
            res.status(201).json({
                message: 'Image uploaded successfully',
                link: imageLink,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error occurred during upload',
                error: error.message,
            });
        }
    } else {
        res.status(400).json({
            message: 'Invalid request body',
        });
    }
};
module.exports = {
    newImage,
};