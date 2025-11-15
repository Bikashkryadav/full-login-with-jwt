const express = require('express')
const router = express.Router()
const usermodel = require("../model/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                "message": "Fill all information"
            })
        }
        const finduser = await usermodel.findOne({ email })
        if (!finduser) {
            return res.status(400).json({
                "message": "User not found"
            })
        }
        const check = await bcrypt.compare(password, finduser.password)

        if (!check) {
            return res.status(400).json({
                "message": "Email and passowrd incorrect"
            })
        }
        const token = jwt.sign({ email: finduser.email, usertype: finduser.usertype, name: finduser.name }, process.env.SECRET_KEY)
        res.cookie("token", token, { httpOnly: true })
        res.status(200).json({
            "message": "Sucessful login"
        })
    } catch (error) {
        res.status(400).json({
            "message": error
        })

    }
})
router.post("/signUp", async (req, res) => {
    try {
        const { email, password, name } = req.body
        if (!email || !password || !name) {
            return res.status(400).json({
                "message": "Fill all information"
            })
        }
        const check = await usermodel.findOne({ email })
        if (check) {
            return res.status(400).json({
                "message": "email ALready resister!"
            })
        }
        const hashpassword = await bcrypt.hash(password, 12)
        const create = await usermodel.create({
            email: email,
            name: name,
            password: hashpassword
        })
        res.status(200).json({
            "message": "Sucessful create "
        })
    } catch (error) {
        res.status(400).json({
            "message": error
        })
    }
})
router.get("/logout", (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({
            "message": "sucessful logout"
        })
    } catch (error) {
        res.status(400).json({
            "message": error
        })
    }
})

router.get("/me", (req, res) => {
    const token = req.cookies.token
    if (!token) return res.json({ loggedIn: false })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        res.json({ loggedIn: true, user: decoded })
    } catch (err) {
        res.json({ loggedIn: false })
    }
})

module.exports = router