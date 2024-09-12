const { home, signUp, getUser, login ,logout} = require('../controllers/controller')
const jwtAuth = require('../middleware/jwtAuth')
const loginDataValidate = require('../middleware/loginDataValidate')
const signupDataValidate = require('../middleware/signUpDataValidate')
const express = require('express')
const router = express.Router()

router.get('/', home)

router.post('/signup', signupDataValidate, signUp)//creating new account
router.post('/login', loginDataValidate, login)//user login
router.get('/getuser', jwtAuth, getUser)//user authentication
router.get('/logout',jwtAuth,logout)//user logout


module.exports = router

