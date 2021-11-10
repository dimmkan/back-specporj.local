const router = require('express').Router();
const controller = require('../controllers/auth');

router.post('/login', (req, res) => {
    return controller.login(req, res)
});

module.exports = router