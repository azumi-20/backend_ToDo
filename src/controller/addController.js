const UserTask = require('../models/taskModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config();

const addToDo = async(req, res) =>{

    if (!req.body) {
    return res.status(400).json({ message: "Body vacío" });
    }
    
    const {nombreTarea, descripTarea, fechaInicioTarea , horaTarea, estadoTarea, token} = req.body
    const JWT_SECRET = process.env.JWT_SECRET

    try {
        
        if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
        }

        const decodificasToken = jwt.verify(token, JWT_SECRET)
        const userId = decodificasToken.id

        const usuario = await User.findById(userId)
        if (!usuario) {
        return res.status(401).json({ message: "El usuario no existe" });
        }

        //creamos el modelo de tarea
        const task = new UserTask({
            userId,
            nombreTarea,
            descripTarea,
            fechaInicioTarea,
            horaTarea,
            estadoTarea
        })

        //guardamos
        await task.save()
        res.status(201).json({ message: "Tarea agregada", task });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar Tarea', error: error.message });
    }

}

module.exports = {addToDo}