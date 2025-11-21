const User = require('../models/userModel')
const {generateToken} = require('../service/auth.service')
const {isMATCH} = require('../service/password.service')


const login = async(req, res) =>{
    const {correo, contrasena} = req.body

    try {
        //primer correo que coincida
        const usuario = await User.findOne({correo: correo})

        //verificamos que existe
        if(!usuario){
            return res.status(401).json({
                message: "El usuario no existe"
            })
        }

        //mandamos la contraseña que ingresa y la comparamos con la anterior
        const isMATCHhed = await isMATCH(contrasena, usuario.contrasena)

        //traemos para verificar si existe o no
        if (!isMATCHhed) {
        return res.status(401).json({ message: "Contraseña incorrecta" })
        }

        //generamos Toker
        const token =  generateToken(usuario)

        res.status(201).json({
        message: 'Usuario Bienvenido de Nuevo',
        token
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
        message: 'Error al registrar usuario'
    })
    }
}

module.exports = {login}