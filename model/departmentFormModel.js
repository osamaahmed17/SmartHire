const mongoose = require("mongoose")
const { Schema } = require('mongoose')

let schema = new Schema({
    departmentName: {
        type: String,
        require: true,
        unique: true
    },
    departmentLink: {
        type: String,
        require: true,
        unique: true
    }
});
module.exports = mongoose.model("departmentform", schema);