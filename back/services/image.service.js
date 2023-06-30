const Model = require('../models/index')
const fs = require('fs');
const mongodb = require('mongodb');

const upload = async (name, description, link, user) => {
    const newImage = new Model.Image({
        name: name,
        description: description,
        link: link,
        user: user,
    })
    try {
        await newImage.save()
    } catch (error) {
        console.log('Error occurred while saving image info to the database:', error);
        throw new Error('Error occurred while saving image info to the database:', error);
    }

}

const getImage = async (amount) => {
    const images = await Model.Image.find().sort({ _id: -1 }).limit(amount);
    if (!images) {
        throw new Error("No images");
    }
    return images;
}

const getUserImages = async (username) => {
    const images = await Model.Image.find({ user: username }).sort({ _id: -1 });
    if (!images) {
        throw new Error("No images");
    }
    return images;
}

const deleteImage = async (id, username) => {
    const image = await Model.Image.findById(id);
    if (!image) {
        console.log("No image");
        throw new Error("No image");

    }
    if (image.user !== username) {
        return false;
    }
    try {
        await Model.Image.findByIdAndDelete(id);
    } catch (error) {
        console.log('Error occurred while deleting image info from the database:', error);
    }

    imagePath = image.link.split('/').slice(-1)[0];
    fs.unlink('./images/' + imagePath, (err) => {
        if (err) {
            console.log('Error occurred while deleting image:', err);
            throw new Error('Error occurred while deleting image:', err);
        }
    });
    return true
}

module.exports = {
    upload,
    getImage,
    getUserImages,
    deleteImage,
}