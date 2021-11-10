const router = require('express').Router()
const Pacient = require('../models/pacient')
const passport = require('passport')


//Получение списка пациентов
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const pacients = await Pacient.findAll()
        res.status(200).json({pacients})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Получение данных пациента
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const pacient = await Pacient.findByPk(+req.params.id)
        res.status(200).json({pacient})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Добавление пациента
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const pacient = await Pacient.create({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            passportSerial: req.body.passportSerial,
            passportNum: req.body.passportNum,
            address: req.body.address,
            omsNum: req.body.omsNum,
            diagnosis: req.body.diagnosis,
            recipe: req.body.recipe,
            doctorID: req.body.doctorID,
            filialID: req.body.filialID,
        })
        res.status(201).json({pacient})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Изменение пациента
router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        let pacient = await Pacient.findByPk(+req.params.id)
        for(const bodyKey in req.body){
            pacient[bodyKey] = req.body[bodyKey]
        }
        pacient.save()
        res.status(200).json({pacient})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Удаление пациента
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const pacient = await Pacient.findByPk(+req.params.id)
        await pacient.destroy()
        res.status(204).json({})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})

module.exports = router