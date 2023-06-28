const Model = require('../models/index')
const Crypto = require('../utils/crypto')

const signup = async (user) => {

    const existingUser = await Model.User.findOne({
        email: user.email,
    })
    if (existingUser) {
        throw new Error('User already exists')
    }
    if (user.password.length < 8) {
        throw new Error('Password must be at least 8 characters long')
    }
    const newUser = new Model.User({
        username: user.username,
        email: user.email,
        password: Crypto.hashPassword(user.password),
    })
    console.log('New user:', newUser);
    try {
        await newUser.save()
    } catch (error) {
        console.log('Error occurred while saving user info to the database:', error);
        throw error
    }
}

module.exports = {
    signup,
}