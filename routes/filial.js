const router = require('express').Router()
const filialController = require('../controllers/filial')
const passport = require('passport')


//Получение списка филиалов
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await filialController.getAll(req, res)
})

//Получение данных филиала
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await filialController.getById(req, res)
})

//Добавление филиала
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await filialController.createFilial(req, res)
})

//Изменение филиала
router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await filialController.updateFilial(req, res)
})

//Удаление филиала
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await filialController.deleteFilial(req, res)
})

module.exports = router