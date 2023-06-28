const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const saltRounds = 10
const hashPassword = (password) => {

    try {
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPassword = bcrypt.hashSync(password, salt)
        return hashedPassword
    } catch (error) {
        console.log('Error occurred during hashing:', error);
        throw error
    }
}

const comparePassword = async (hashedPassword, password) => {
    const result = await bcrypt.compare(password, hashedPassword)
    return result;
}
const generateToken = (user) => {
    const token = jwt.sign({
        username: user.username,
        email: user.email,
    }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: '1h',
    })
    return token
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
}