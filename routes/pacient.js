const router = require('express').Router()
const pacientController = require('../controllers/pacient')
const passport = require('passport')


//Получение списка пациентов
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await pacientController.getAll(req, res)
})

//Получение данных пациента
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await pacientController.getById(req, res)
})

//Добавление пациента
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await pacientController.createPacient(req, res)
})

//Изменение пациента
router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await pacientController.updatePacient(req, res)
})

//Удаление пациента
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await pacientController.deletePacient(req, res)
})

module.exports = router