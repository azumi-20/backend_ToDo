const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();

//router
const routerToDo = require('./src/router/toDoRouter')
const routerLogin = require('./src/router/loginsRouter')


const app = express()
app.use(cors())
app.use(express.json());


//Router
app.use('/user', routerLogin)
app.use('/user/todo', routerToDo)

//Conectar a MONGODB
//conectar a la db
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => console.error("Error al conectar a MongoDB Atlas:", err));

const db = mongoose.connection;


module.exports = app