const router = require('express').Router()
const Doctor = require('../models/doctor')
const passport = require('passport')

//Получение списка врачей
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const doctors = await Doctor.findAll()
        res.status(200).json({doctors})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Получение данных врача
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const doctor = await Doctor.findByPk(+req.params.id)
        res.status(200).json({doctor})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Добавление врача
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const doctor = await Doctor.create({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            specification: req.body.specification,
            filialID: req.body.filialID,
            imageURI: req.body.imageURI,
        })
        res.status(201).json({doctor})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Изменение врача
router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        let doctor = await Doctor.findByPk(+req.params.id)
        for(const bodyKey in req.body){
            doctor[bodyKey] = req.body[bodyKey]
        }
        doctor.save()
        res.status(200).json({doctor})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Удаление врача
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const doctor = await Doctor.findByPk(+req.params.id)
        await doctor.destroy()
        res.status(204).json({})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})

module.exports = router