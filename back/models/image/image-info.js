
const Schema = require('mongoose').Schema;

const SchemaImage = new Schema({
    name: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    link: {
        required: true,
        type: String,
    },
    user: {
        required: false,
        type: String,
    },
})

module.exports = SchemaImage;