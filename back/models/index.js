let model = require("mongoose").model;

let SchemaUser = require("./user/user-info")
let SchemaImage = require("./image/image-info")

module.exports = {
    User: model("user", SchemaUser),
    Image: model("image", SchemaImage),
};