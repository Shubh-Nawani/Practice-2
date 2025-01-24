const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const middleware = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const signup = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({msg: "Please enter all fields"});
        }
        if (!User.findOne({email})) {
            return res.status(400).json({msg: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.json(newUser);

    } catch (err) {
        console.error(err.message);
    }

}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await User.findOne({email})
        if (!existingUser) {
            return res.status(400).json({msg: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({msg: "Invalid credentials"});
        }
        
const token = await jwt.sign({email:existingUser.email},
    "secret",
    {expiresIn: "1h"}
)
res.status(200).send({token, user: existingUser});



    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {signup, login};
