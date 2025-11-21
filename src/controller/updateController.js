const UserTask = require('../models/taskModel')
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config();


const actualizarToDo = async(req, res)=>{
    const {token, id, nombreTarea, descripTarea, fechaInicioTarea , horaTarea, estadoTarea} = req.body
     // En su lugar, decodificas el token y sacas el id
    const JWT_SECRET = process.env.JWT_SECRET

    try {     
            if (!token) {
            return res.status(401).json({ message: "Token no proporcionado" });
            }

            const decodificasToken = jwt.verify(token, JWT_SECRET)
            const userId = decodificasToken.id
    
            // Actualizamos la tarea si existe
            const tareaActualizada = await UserTask.findOneAndUpdate(
            { _id: id, userId: userId },
            { nombreTarea, descripTarea, fechaInicioTarea , horaTarea, estadoTarea },
            { new: true } // devuelve el documento actualizado
        );

            if(!tareaActualizada){
            return res.status(404).json({ message: "Tarea no encontrada" });
            }

            return res.status(200).json({ message: "Tarea actualizada correctamente", tareaActualizada });


        } catch (error) {
            res.status(500).json({
            message: "Error al actualizar Tarea",
            })
        }
}

module.exports = {actualizarToDo}

/*

Qué significa {_id: id, userId: userId}
_id: id → buscamos la tarea específica que querés actualizar, identificada por su _id en la DB.
userId: userId → aseguramos que la tarea pertenece al usuario que envió el token.
*/