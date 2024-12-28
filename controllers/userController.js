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

// Update user profile
exports.updateProfileController = async (req, res) => {
    const { username, phoneno } = req.body;
    const userId = req.params.id; // Use `id` from the route parameter

    if (!username || !phoneno) {
        return res.status(400).json({ error: 'Username and Phone Number are required!' });
    }

    try {
        const updatedUser = await users.findByIdAndUpdate(userId, { username, phoneno }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found!' });
        }
        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: 'An error occurred while updating the profile' });
    }
};

