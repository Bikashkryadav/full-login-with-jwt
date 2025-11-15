const express = require("express")
const router = express.Router()
const auth = require("../middelware/auth")
const usermodel = require("../model/user")
router.get("/", auth, async (req, res) => {
    try {
        const email = req.user.email
        const check = await usermodel.findOne({ email })
        if (check.usertype != "admin") {
            return res.status(400).json({
                "message": "Your are not admin"
            })
        } else {
            const get = await usermodel.find()
            return res.status(200).json(get)
        }
    } catch (error) {
        res.status(400).json({
            "message": error
        })

    }
})
module.exports = router