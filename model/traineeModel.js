const mongoose = require("mongoose")
const { Schema } = require('mongoose')

let schema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    }, 
    department: {
        type: String,
        require: true
    },
    contactNumber: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    }

});
module.exports = mongoose.model("trainee", schema);