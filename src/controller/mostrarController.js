const UserTask = require('../models/taskModel')
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config();


const mostrarToDo = async(req, res)=>{
    const {token} = req.body
    const JWT_SECRET = process.env.JWT_SECRET

    try {
        if(!token){
            return res.status(401).json({ message: "Token no proporcionado" });
        }
        const decodificasToken = jwt.verify(token, JWT_SECRET)
        const userId = decodificasToken.id
        
        const tareas = await UserTask.find({ userId });
        res.status(200).json({ message: "Tareas obtenidas", tareas });

    } catch (error) {
        res.status(500).json({ message: "Error al obtener Tareas" })
    }
}

module.exports = {mostrarToDo}