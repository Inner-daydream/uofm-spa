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

const getUser = async (username) => {

    const user = await Model.User.findOne({
        username: username,
    })
    if (!user) {
        throw new Error("User doesn't exists")
    }
    return user
}

const login = async (user) => {
    const dbUser = await getUser(user.username)
    //try{
    const passwordMatch = await Crypto.comparePassword(dbUser.password, user.password)
    console.log('promise status ' + passwordMatch)
    //}catch (error){
    //  throw new Error("An error has occurred during login")
    //}
    if (passwordMatch) {
        const token = Crypto.generateToken(dbUser)
        dbUser.token = token
        return dbUser
    }
    else {
        throw new Error('Wrong password')
    }
}

module.exports = {
    signup,
    login,

}