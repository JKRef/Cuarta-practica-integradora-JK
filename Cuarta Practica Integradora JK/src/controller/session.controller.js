const { COOKIE_USER , COOKIE_FORGOT}=  require("../config/config");
const { DtoUser } = require('../dao/DTO/DTOuser');
const {sesionServices} = require('../service');
const { invalidEmail , passwordinvalid} = require('../utils/creatormsg');
const customError =require('../utils/custommsg');
const {ERROR_USER} =require('../utils/Varerror');
const mailingService =require('../service/mailing.service');
const {generateToken} = require('../utils/jwt');
const {comparePassword , hashPassword} = require('../utils/hashpassword')


const sessionLogin = async (req,res)=>{
    
    res
    .cookie(COOKIE_USER, req.user.token, { maxAge: 300000, httpOnly: true })
    .send( req.user )
}

const loginRegister = async (req,res)=>{
    res.send(req.user) 
}  
const getCurrent = async (req,res)=>{
    newUser = DtoUser(req.user)
    res.send(newUser) 
}  

const forgotPassword = async (req, res, next)=>{
    try {
      const {email} = req.body
      const verifyUser = await sesionServices.getEmail({email:email}) 
      if (!verifyUser) {
        return next (CustomError.createError({code:ERROR_USER, msg: invalidEmail(), typeError:"ERROR_USER"})) 
      }
     const token = generateToken({id:verifyUser._id, email:verifyUser.email})
     mailingService.sendMail({
        to: verifyUser.email,
        subject: ` Hola ${verifyUser.firstName}`,
        html: `<a href="http://localhost:8080/forgotPasswod" style="margin: 20px 0; color: #080808;">Restablecer Constraseña</a>`
      })
         
      res
        .json({
        status: "Sucess",
        message:`Se Envio email a ${verifyUser.email} para restableser Contraseña`,
        token:token
        })  
        
        
    } catch (error) {
      console.log("errr")
    }  
    
  }
  
  const forgotrecovery = async (req, res, next)=>{
    try {
      const newPassword= req.body.password
      const password = req.payload.password
      const igualPassword = await comparePassword(newPassword , password);
      console.log (igualPassword)
      if (igualPassword) {
        return res.status(403).json({
          status: 'error',
          message: 'La contraseña no puede ser igual a la anterior',
        });
      }
       const hash = await hashPassword(newPassword)
  
       const updateUser =  
         {
          password: hash,
         }
  
     
      
    } catch (error) {
      res.status(403).json({
        status: 'error',
        message: error,
      });
    }
    
}
const roleChange = async (req, res, next)=>{
  const {uid} = req.params
  const {rol}= req.body
  const user = await sesionServices.getUserId(uid)
  if (!user){
   return res.status(200).json({
     status: "error",
     message: "Usuario no Encontrado",
   });
  }
  if (user.rol === rol){
   return res.status(200).json({
     status: "error",
     message: `El usuario ya tiene role ${rol}`,
   });
  }
    
   await sesionServices.updateUserRole (user.id, rol);
   return res.status(200).json({
     status: "Success",
     message: "El Role Cambiado con exito",
   });
}
 const uploadDocuments = (req, res) => {
     try {
      console.log(req); 
     } catch (error) {
       
     }
 } 




module.exports={
    sessionLogin,
    loginRegister,
    getCurrent,
    forgotPassword,
    forgotrecovery,
    roleChange,
    uploadDocuments
}