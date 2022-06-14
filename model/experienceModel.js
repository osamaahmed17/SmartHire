const mongoose = require("mongoose")
const { Schema } = require('mongoose')

let schema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    traineeName: {
        type: String,
        require: true,
    },
    departmentName: {
        type: String,
        require: true,
    },
    interviewDate: {
        type: String,
        require: true,
    },
    experience: {
        type: String,
        require: true
    }

});
module.exports = mongoose.model("experience", schema);