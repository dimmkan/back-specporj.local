const User = require('../models/user')
const bcrypt = require('bcryptjs')

class userController {

    async getAll(req, res) {
        try {
            const users = await User.findAll()
            res.status(200).json({users})
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async getById(req, res) {
        try {
            const user = await User.findByPk(+req.params.id)
            res.status(200).json({user})
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async createUser(req, res) {
        try {
            const hashPassword = await bcrypt.hash(req.body.password, 10)
            const user = await User.create({
                email: req.body.email,
                password: hashPassword,
                role: req.body.role ?? 'user',
                filialID: !req.body.filialID || isNaN(+req.body.filialID) ? null : +req.body.filialID
            })
            res.status(201).json({user})
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async updateUser(req, res) {
        try {
            let user = await User.findByPk(+req.params.id)
            for (const bodyKey in req.body) {
                if (bodyKey === 'password') {
                    user[bodyKey] = await bcrypt.hash(req.body[bodyKey], 10)
                } else {
                    user[bodyKey] = req.body[bodyKey]
                }
            }
            user.save()
            res.status(200).json({user})
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await User.findByPk(+req.params.id)
            await user.destroy()
            res.status(204).json({})
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

}

module.exports = new userController()