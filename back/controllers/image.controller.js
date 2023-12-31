const Service = require('../services/index.js');
const newImage = async (req, res, next) => {
    const imageInfo = req.body;
    if (imageInfo.name && imageInfo.description && req.file && req.user.username) {
        try {
            const uploadTime = Date.now()
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

const getImage = async (req, res, next) => {
    if (req.query.amount) {
        try {
            const images = await Service.ImageService.getImage(req.query.amount);
            res.status(200).json({
                images: images,
            });
        } catch (error) {
            res.status(404).json({
                error: error.message,
            });
        }
    } else {
        res.status(400).json({
            message: 'Invalid request',
        });
    }
}

const getUserImages = async (req, res, next) => {
    if (req.user.username) {
        try {
            const images = await Service.ImageService.getUserImages(req.user.username);
            res.status(200).json({
                images: images,
            });
        } catch (error) {
            res.status(404).json({
                error: error.message,
            });
        }
    } else {
        res.status(400).json({
            message: 'Invalid request',
        });
    }
}
const deleteImage = async (req, res, next) => {
    if (req.params.id) {
        try {
            const authorized = await Service.ImageService.deleteImage(req.params.id, req.user.username);
            if (!authorized) {
                res.status(403).json({
                    message: 'Unauthorized',
                });
            } else {
                res.status(200).json({
                    message: 'Image deleted successfully',
                });
            }
        } catch (error) {
            res.status(404).json({
                error: error.message,
            });
        }
    } else {
        res.status(400).json({
            message: 'Invalid request',
        });
    }
}


module.exports = {
    newImage,
    getImage,
    getUserImages,
    deleteImage,
};