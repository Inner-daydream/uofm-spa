const { ImageService } = require('.');
const Model = require('../models/index')
const upload = async (name, description, link, user, uploadTime) => {
    const newImage = new Model.Image({
        name: name,
        description: description,
        link: link,
        user: user,
        uploadTime: uploadTime,
    })
    try {
        await newImage.save()
    } catch (error) {
        console.log('Error occurred while saving image info to the database:', error);
        throw new Error('Error occurred while saving image info to the database:', error);
    }

}

const getImage = async (amount) => {
    const images = await Model.Image.find().sort({_id : -1 }).limit(amount);
    if(!images){
        throw new Error("No images");
    }
    return images;
}
module.exports = {
    upload,
    getImage,
}