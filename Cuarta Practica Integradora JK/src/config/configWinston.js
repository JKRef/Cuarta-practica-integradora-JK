const winston = require('winston');
const optionWinston ={
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5,
    },
    colors:{
      fatal:'orange',
      error:'red',
      warning:'yellow',
      info:'gray',
      http:'blue',
      debug:'green',

    }
}

const loggerProd = winston.createLogger({
    levels:optionWinston.levels,
   transports:[
        new winston.transports.File({filename:'.errors.log',
        level:"info",
        format:winston.format.combine(
           winston.format.colorize({colors:optionWinston.colors}),
           winston.format.simple()
        )}),
    ]
})

const loggerDev = winston.createLogger({
    levels:optionWinston.levels,
    transports:[
        new winston.transports.Console
        ({level:"debug",
        format:winston.format.combine(
            winston.format.colorize({colors:optionWinston.colors}),
            winston.format.simple()
         )
    }),
    ]
})

const mdwLooger = (req, res, next)=>{
    req.logger = (process.env.NODE_ENV)? loggerProd :loggerDev ;
    req.logger.info(`${req.method} ${req.url}`);
    next();
}
module.exports = {
    mdwLooger,
    logger:process.env.NODE_ENV ? loggerProd :loggerDev
}