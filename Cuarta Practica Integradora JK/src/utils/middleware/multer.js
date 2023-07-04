const multer = require('multer');
const { TYPE_DOCUMENTS } = require('../../config/config');
const { logger } = require('../../config/config.winston');
const path = require('path');


const storage = multer.diskStorage({
  
      destination: (req, file, next)=> {
        
       logger.info('fieldName = '+file.fieldname)
       const typeDocument = req.body.typeDocument;
        let route = 'documents';
        if(TYPE_DOCUMENTS.findIndex((value)=>value==typeDocument) == -1 && typeDocument != 'product' && typeDocument != 'thumbnail'){
          return next(new Error('type file not support'))
        }
    
        if (file.fieldname == 'thumbnail') route = 'profile';
        if (file.fieldname == 'document') route = 'document';
        if (file.fieldname == 'product') route = 'products';
        req.route = route
        next(null,path.join(__dirname + `/../public/documents/${route}`));
      },
      filename: (req, file, next)=> {
        logger.info('req file type - '+file.mimetype)
        let filename = `${Date.now()}-${file.original}`;
        let fileExtension = file.original.split('.');
        req.filename=`${filename}.${fileExtension[1]}`
        next(null, `${filename}.${fileExtension[1]}`);
      },
    });


module.exports= multer({storage})