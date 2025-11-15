const mongoose = require("mongoose")
const DB = async () => {
    try {
        const DB = await mongoose.connect("mongodb://localhost:27017/Full_login")
        console.log("connection done with DB")
    } catch (error) {
        console.log(Error)
    }
}
module.exports = DB