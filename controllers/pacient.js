const Pacient = require('../models/pacient')

class pacientController {

    async getAll(req, res) {
        try{
            const pacients = await Pacient.findAll()
            res.status(200).json({pacients})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async getById(req, res) {
        try{
            const pacient = await Pacient.findByPk(+req.params.id)
            res.status(200).json({pacient})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async createPacient(req, res) {
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
    }

    async updatePacient(req, res) {
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
    }

    async deletePacient(req, res) {
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
    }

}

module.exports = new pacientController()