const bcrypt = require("bcrypt")

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

module.exports = {
    hashPassword,
}