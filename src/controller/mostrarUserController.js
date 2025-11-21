const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const {config} = require('dotenv')
config()

const getPerfil = async(req, res) =>{
    const {token} = req.body //token
    const JWT_SECRET = process.env.JWT_SECRET//traemos el token JWT

    try {
        const decodificasToken = jwt.verify(token, JWT_SECRET)//descodificamos el tokn
        const userId = decodificasToken.id//objetnemos el id que devuelve al descodificar

        const usuario = await User.findOne({_id: userId})//traemos el primer id que coincida

        if (!usuario) {//verificamos que exista el usuario
            return res.status(404).json({ message: "Usuario no encontrado" })
        }
        
        res.status(200).json({ usuario })//imprimimos los datos

    } catch (error) {
        res.status(500).json({ message: "Error al obtener perfil" })
    }
}

module.exports = {getPerfil}