

//const express = require("express")
const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    usertype: {
        type: String,
        default: "user"
    }
})
const usermodel = mongoose.model("user", userSchema)
module.exports = usermodel