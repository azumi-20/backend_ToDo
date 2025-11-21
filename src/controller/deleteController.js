const UserTask = require('../models/taskModel')
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config();


const eliminarToDo = async(req, res)=>{
    const {token, borra} = req.body
     // En su lugar, decodificas el token y sacas el id
    const JWT_SECRET = process.env.JWT_SECRET

    try {     
            if (!token) {
            return res.status(401).json({ message: "Token no proporcionado" });
            }

            const decodificasToken = jwt.verify(token, JWT_SECRET)
            const userId = decodificasToken.id
    
            //NO HAY ARRAY
            const tareaEliminada = await UserTask.findOneAndDelete({ _id: borra, userId });

            if (!tareaEliminada) {
            return res.status(404).json({ message: "Tarea no encontrada" });
            }

            res.status(200).json({ message: "Tarea eliminada correctamente" });

    
        } catch (error) {
            res.status(500).json({
            message: "Error al eliminar Tarea",
            })
        }
}

module.exports = {eliminarToDo}