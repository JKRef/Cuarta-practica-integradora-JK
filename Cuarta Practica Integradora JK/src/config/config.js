const dotenv = require('dotenv')
const { program } = require('commander')
const { logger } = require('./configWinston')

program.requiredOption('--mode <mode>', 'modo de ejecucion del servidor', 'development');
program.parse();

const ambiente = program.opts().mode;

dotenv.config({
  path: path.join(__dirname,ambiente == 'development' ? '../../.env.development' : '../../.env.production') 
});
const TYPE_DOCUMENTS = [
  'Identificacion',
  'comprobante de domicilio',
  'comprobante de estado de cuenta'

]
logger.info(`"mode: ${process.env.ENVIROMENT}`)

module.exports ={
  MONGODBURL: process.env.ENVIROMENT,
  PRIVATE_KEY_JWT: process.env.PRIVATE_KEY_JWT,
  REGISTER_STRATEGY: process.env.REGISTER_STRATEGY,
  LOGIN_STRATEGY: process.env.LOGIN_STRATEGY,
  JWT_STRATEGY: process.env.JWT_STRATEGY,
  PORT : process.env.PORT,
  COOKIE_USER: process.env.COOKIE_USER,
  COOKIE_FORGOT:process.env.COOKIE_FORGOT,
  PERCIST:process.env.PERCIST,
  MAILING:{
    user:process.env.USERMAILING,
    password:process.env.PASSWORDMAILING
  },
  TYPE_DOCUMENTS
}