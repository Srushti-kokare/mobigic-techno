const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")

//const auth = require('../middleware/auth')

//------------------API's-----------------------------------------------------------------------------------

router.post('/register', userController.register)
router.post('/login', userController.login)
// router.get('/user/:userId/profile', auth.userAuth, userController.getUserDetail)
// router.put('/user/:userId/profile', auth.userAuth, userController.updateUser)


module.exports = router;