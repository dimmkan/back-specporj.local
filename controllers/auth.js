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
            const user = await User.findOne({where: {email}})
            if(!user) {
                return res.status(400).json({message: 'Email error', code: 2})
            }
            const validPassword = bcrypt.compareSync(password, user.dataValues.password)
            if(!validPassword) {
                return res.status(400).json({message: 'Password error', code: 2})
            }
            const token = generateAccessToken(user.id, user.email);
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async registration(req, res) {
        try {
            const {email, password} = req.body;
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return res.json({message: 'User is already registered'})
            }
            const hashPassword = await bcrypt.hash(password, 10)
            const user = await User.create({
                email: req.body.email,
                password: hashPassword,
                role: req.body.role ?? 'user',
                filialID: null
            })
            res.status(201).json({user})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }
}

module.exports = new authController()