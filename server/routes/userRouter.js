const Router = require('express')
const router = new Router()
const controller = require('../controller/controller.js')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/auth', authMiddleware, controller.auth)


module.exports = router