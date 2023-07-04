const adminPermission = async (req, res, next) => {

    const {user}= req.user
    if (!user || user.rol !== 'administador') {
        return res.status(401).json({
            status: 'error',
            mensaje:'el usuario no esta autorizado',
        });
    }

    next()
}

const userPermission = async (req, res, next) => {
    if (!user || user.rol !== 'user'){
        return res.status(401).json({
            status:'error',
            mensaje:'el usuario no esta autorizado',
        });
    }

    next()
}

module.exports = {
    adminPermission,
    userPermission

}