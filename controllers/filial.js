const Filial = require('../models/filial')

class filialController {

    async getAll(req, res) {
        try{
            const filials = await Filial.findAll()
            res.status(200).json({filials})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async getById(req, res) {
        try{
            const filial = await Filial.findByPk(+req.params.id)
            res.status(200).json({filial})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async createFilial(req, res) {
        try{
            const filial = await Filial.create({
                description: req.body.description,
                address: req.body.address,
                city: req.body.city
            })
            res.status(201).json({filial})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async updateFilial(req, res) {
        try{
            let filial = await Filial.findByPk(+req.params.id)
            for(const bodyKey in req.body){
                filial[bodyKey] = req.body[bodyKey]
            }
            filial.save()
            res.status(200).json({filial})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async deleteFilial(req, res) {
        try{
            const filial = await Filial.findByPk(+req.params.id)
            await filial.destroy()
            res.status(204).json({})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

}

module.exports = new filialController()