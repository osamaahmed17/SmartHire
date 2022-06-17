const mongoose = require("mongoose")
const { Schema } = require('mongoose')

let schema = new Schema({
    experienceID:{
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
       
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
    },
    sentimentAnalysis: {
        type: Number,
        require: true
    }

});
module.exports = mongoose.model("experience", schema);