const User = require('../models/userModel')
const {generateToken} = require('../service/auth.service')
const {hashPassword} = require('../service/password.service')

const register = async(req, res) =>{
    const {nombre, correo, contrasena} = req.body

    try {

        //encriptamos la contraseña
        const hasGuardar = await hashPassword(contrasena)

        //Creamos el usuario
        const usuario = await User.create({
            nombre,
            correo, 
            contrasena: hasGuardar
        })

        //generamos el tokern
        const token = generateToken(usuario)


        res.status(201).json({
        message: 'Usuario registrado exitosamente',
        usuario,
        token
    })

        
    } catch (error) {
        console.error(error)
        res.status(500).json({
        message: 'Error al registrar usuario'
    })
    }
}

module.exports = {register}

