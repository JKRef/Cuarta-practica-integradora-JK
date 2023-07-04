const DTOuser = (user) =>{
    const newUserDTO ={
        id:user.user._id,
        first_Name:user.user.first_Name,
        last_Name:user.user.last_Name,
        rol: user.user.rol
    }
    return newUserDTO
}

module.exports = {
    DTOuser
}