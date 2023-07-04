const loggerTest =(req,res)=>{
    req.logger.fatal('');
    req.logger.error('');
    req.logger.warn('');
    req.logger.info('');
    req.logger.http('');
    req.logger.debug('');
   // res.json({ Error });
}

module.exports = loggerTest