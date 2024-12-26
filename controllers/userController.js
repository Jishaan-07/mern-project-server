const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
// register -logic
exports.registerController = async (req, res) => {
    console.log("inside registerController");
    const { username, phoneno, email, password } = req.body
    console.log(username, phoneno, email, password);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User Already Exists...Please Login.")

        } else {
            const newUser = new users({
                username, phoneno, email, password
            })
            await newUser.save()
            res.status(200).json(newUser)

        }

    } catch (err) {
        res.status(401).json(err)

    }


}
// logic
exports.loginController = async (req, res) => {
    console.log("inside loginController");
    const { email, password } = req.body
    console.log(email, password);

    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            // token generate
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })

        } else {

            res.status(404).json("Invalid Email/Password")

        }

    } catch (err) {
        res.status(401).json(err)

    }


}

// profile updation