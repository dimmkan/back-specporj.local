const Doctor = require('../models/doctor')

class doctorController {

    async getAll(req, res) {
        try{
            const doctors = await Doctor.findAll()
            res.status(200).json({doctors})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async getById(req, res) {
        try{
            const doctor = await Doctor.findByPk(+req.params.id)
            res.status(200).json({doctor})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async createDoctor(req, res) {
        try{
            const doctor = await Doctor.create({
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                specification: req.body.specification,
                filialID: isNaN(+req.body.filialID) ? null : +req.body.filialID,
                imageURI: req.body.imageURI,
            })
            res.status(201).json({doctor})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async updateDoctor(req, res) {
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
    }

    async deleteDoctor(req, res) {
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
    }

    async uploadImage(req, res) {
        try{
            const doctor = await Doctor.findByPk(+req.params.id)
            doctor.imageURI = 'http://localhost:8000/' + req.file.path.replace('\\', '\/')
            doctor.save()
            res.status(200).json({message: 'Image uploaded', filepath: doctor.imageURI})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}

module.exports = new doctorController()