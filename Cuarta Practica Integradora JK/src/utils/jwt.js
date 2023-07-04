const jwt = require('jsonwebtoken');
const { PRIVATE_KEY_JWT } = require('../config/config');
const { sesionServices } = require('../service');



const generateToken = (payload) => {
    const token = jwt.sign({payload}, PRIVATE_KEY_JWT, {expiresIn:'24h'});
    return token;
}



const getPayload = (req,res,next) => {
    const headerAuth = req.headers.authorization
    if (!headerAuth) {
        res.status(403).sed({error:'token inexistente'})
    }
  const token = headerAuth.split(' ')[1];
  if(token) {
     jwt.verify(token, PRIVATE_KEY_JWT, async (error, credential)=>{
         if (error){
            res.status(500).send({error:'error inesperado',error});
         }else{
            const user = await sesionServices.getUserId (credential.payload)
            req.payload.user = user
            next();

         }
     })
  } else{
    res.status(401).send({error:'no se encontro el token'});
        
  }  
}



module.exports ={
    generateToken,
    getPayload
}