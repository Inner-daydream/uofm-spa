
const Schema = require('mongoose').Schema;

const SchemaImage = new Schema({
    name: {
        required: true,
        type: String,
        unique: true,
    },
    description: {
        required: true,
        type: String,
    },
    link: {
        required: true,
        type: String,
    },
})

module.exports = SchemaImage;