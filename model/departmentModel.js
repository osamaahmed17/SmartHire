const mongoose = require("mongoose")
const { Schema } = require('mongoose')

let schema = new Schema({
    name: {
        type: String,
        require: true
    },
    placement: {
        type: String,
        require: true
    },
    factory: {
        type: String,
        require: true
    },
    field: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    }
});
module.exports = mongoose.model("department", schema);