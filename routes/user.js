const router = require('express').Router()
const userController = require('../controllers/user')
const passport = require('passport')


//Получение списка пользователей
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await userController.getAll(req, res)
})

//Получение данных пользователя
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await userController.getById(req, res)
})

//Добавление пользователя
router.post('/', passport.authenticate('jwt', {session: false}), passport.authenticate('jwt', {session: false}), async (req, res) => {
    await userController.createUser(req, res)
})

//Изменение пользователя
router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await userController.updateUser(req, res)
})

//Удаление пользователя
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await userController.deleteUser(req, res)
})

module.exports = router