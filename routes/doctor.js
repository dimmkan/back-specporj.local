const router = require('express').Router()
const doctorController = require('../controllers/doctor')
const passport = require('passport')

//Получение списка врачей
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await doctorController.getAll(req, res)
})

//Получение данных врача
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await doctorController.getById(req, res)
})

//Добавление врача
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await doctorController.createDoctor(req, res)
})

//Изменение врача
router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await doctorController.updateDoctor(req, res)
})

//Удаление врача
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await doctorController.deleteDoctor(req, res)
})

module.exports = router