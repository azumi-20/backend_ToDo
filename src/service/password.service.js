const bcrypt = require('bcryptjs')
const SALT_ROUNDS =10

const hashPassword = async(password) =>{
    return await bcrypt.hash(password,SALT_ROUNDS)
}

const isMATCH = async(password, hasGuardado) =>{
    return await bcrypt.compare(password, hasGuardado)
}

module.exports = {hashPassword, isMATCH}