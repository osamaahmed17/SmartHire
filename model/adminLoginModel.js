const mongoose = require("mongoose")
const { Schema } = require('mongoose')

let schema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
module.exports = mongoose.model("adminlogin", schema);


