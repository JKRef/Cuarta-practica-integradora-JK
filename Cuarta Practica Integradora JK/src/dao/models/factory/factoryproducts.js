const {PERCIST} = require("../../../config/config");
const connectMongo = require("../../../config/configDB");

let productDAO={};
(async ()=>{
    switch (PERCIST) {
    case "Mongo":
        connectMongo
        const percistenciaMongo = await require("../BdProductManager")
         productDAO.get =  percistenciaMongo.get
         productDAO.getId =  percistenciaMongo.getId
         productDAO.create =  percistenciaMongo.create
         productDAO.update =  percistenciaMongo.update
         productDAO.deleter =  percistenciaMongo.deleter
        break;

    case "fs":
        const percistenciaFs = await require("../../fsManager/ProductManager")
        productDAO.get =  percistenciaFs.get
        productDAO.getId =  percistenciaFs.getId
        productDAO.create =  percistenciaFs.create
        productDAO.update =  percistenciaFs.update
        productDAO.deleter =  percistenciaFs.deleter


    break;
    
    default:
        const percistenciaMongoDefault = await require("../BdProductManager")
        productDAO.get =  percistenciaMongoDefault.get
        productDAO.getId =  percistenciaMongoDefault.getId
        productDAO.create =  percistenciaMongoDefault.create
        productDAO.update =  percistenciaMongoDefault.update
        productDAO.deleter =  percistenciaMongoDefault.deleter
        connectMongo
        break;
}})();

module.exports = productDAO