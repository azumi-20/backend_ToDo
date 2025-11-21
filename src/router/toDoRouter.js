const express = require('express')
const {addToDo} = require('../controller/addController')
const {actualizarToDo} = require('../controller/updateController')
const {mostrarToDo} = require('../controller/mostrarController')
const {eliminarToDo} = require('../controller/deleteController')

const routerToDo = express.Router()

routerToDo.post('/agregar',addToDo)
routerToDo.post('/eliminar', eliminarToDo)
routerToDo.post('/actualizar', actualizarToDo)
routerToDo.post('/mostrar', mostrarToDo)

module.exports = routerToDo