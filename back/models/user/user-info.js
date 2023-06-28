
const Schema = require('mongoose').Schema;

const SchemaUser = new Schema({
    username: {
        required: true,
        type: String,
        unique: true,
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    }
})

module.exports = SchemaUser;