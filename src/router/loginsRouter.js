const express = require('express')
const {login} = require('../controller/loginController')
const {register} = require('../controller/registerController')
const {getPerfil} = require('../controller/mostrarUserController')

const routerLogin = express.Router()

routerLogin.post('/login',login)
routerLogin.post('/register', register)
routerLogin.post('/perfil', getPerfil)

module.exports = routerLogin