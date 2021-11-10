const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')


//Получение списка пользователей
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const users = await User.findAll()
        res.status(200).json({users})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Получение данных пользователя
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const user = await User.findByPk(+req.params.id)
        res.status(200).json({user})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Добавление пользователя
router.post('/', passport.authenticate('jwt', {session: false}), passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            email: req.body.email,
            password: hashPassword,
            role: req.body.role ?? 'user',
            filialID: +req.body.filialID
        })
        res.status(201).json({user})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Изменение филиала
router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        let user = await User.findByPk(+req.params.id)
        for(const bodyKey in req.body){
            if(bodyKey === 'password'){
                user[bodyKey] = await bcrypt.hash(req.body[bodyKey], 10)
            }else{
                user[bodyKey] = req.body[bodyKey]
            }
        }
        user.save()
        res.status(200).json({user})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Удаление филиала
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const user = await User.findByPk(+req.params.id)
        await user.destroy()
        res.status(204).json({})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})

module.exports = router