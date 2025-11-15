const express = require('express')
const app = express()
const cors = require("cors")
require("dotenv").config()
const DB = require("./connection/connection")
const login = require("./routes/Login")
const admin = require("./routes/Admin")
const cookieparser = require("cookie-parser")
const bodyparser = require("body-parser")
const port = process.env.PORT

DB()

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// FIXED cookie parser
app.use(cookieparser(process.env.SECRET_KEY))

app.use("/login", login)
app.use("/admin", admin)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
