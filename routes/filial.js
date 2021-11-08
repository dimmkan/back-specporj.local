const router = require('express').Router()
const Filial = require('../models/filial')


//Получение списка филиалов
router.get('/', async (req, res) => {
    try{
        const filials = await Filial.findAll()
        res.status(200).json({filials})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Получение данных филиала
router.get('/:id', async (req, res) => {
    try{
        const filial = await Filial.findByPk(+req.params.id)
        res.status(200).json({filial})
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
//Добавление филиала
router.post('/', async (req, res) => {
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
})
//Изменение филиала
router.put('/:id', async (req, res) => {
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
})
//Удаление филиала
router.delete('/:id', async (req, res) => {
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
})

module.exports = router