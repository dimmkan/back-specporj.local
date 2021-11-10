const router = require('express').Router();
const controller = require('../controllers/auth');

router.post('/login', (req, res) => {
    controller.login(req, res)
});

router.post('/registration', (req, res) => {
    controller.registration(req, res)
})

module.exports = router