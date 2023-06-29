const Model = require('../models/index')
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
module.exports = {
    upload,
}