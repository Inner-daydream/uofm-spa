let model = require("mongoose").model;

let SchemaUser = require("./user/user-info");

module.exports = {
    User: model("user", SchemaUser),
};