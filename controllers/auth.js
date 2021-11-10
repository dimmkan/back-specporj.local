const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateAccessToken = (id, email) => {
    const payload = {
        id: id,
        email: email
    }
    return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: "1h"})
}

class authController {
    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user) {
                return res.json({message: 'Email error', code: 2})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.json({message: 'Password error', code: 2 })
            }
            const token = generateAccessToken(user.id, user.email);
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new authController()