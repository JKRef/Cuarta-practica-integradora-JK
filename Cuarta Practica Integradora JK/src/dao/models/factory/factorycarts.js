const {PERCIST} =require('../../../config/config');
const connectMongo = require('../../../config/configDB');

let cartsDAO ={};
(async ()=>{
    switch (PERCIST) {
    case "Mongo":
        connectMongo
        const percistenciaMongo = await require("../../CartManagerDB")
         cartsDAO.get =  percistenciaMongo.get
         cartsDAO.getId =  percistenciaMongo.getId
         cartsDAO.create =  percistenciaMongo.create
         cartsDAO.update =  percistenciaMongo.update
         cartsDAO.deleter =  percistenciaMongo.deleter
        break;

    case "fs":
        const percistenciaFs = await require("../../ProductManagerDB")
        cartsDAO.get =  percistenciaFs.get
        cartsDAO.getId =  percistenciaFs.getId
        cartsDAO.create =  percistenciaFs.create
        cartsDAO.update =  percistenciaFs.update
        cartsDAO.deleter =  percistenciaFs.deleter


    break;
    
    default:
        const percistenciaMongoDefault = await require("../../ProductManager")
        cartsDAO.get =  percistenciaMongoDefault.get
        cartsDAO.getId =  percistenciaMongoDefault.getId
        cartsDAO.create =  percistenciaMongoDefault.create
        cartsDAO.update =  percistenciaMongoDefault.update
        cartsDAO.deleter =  percistenciaMongoDefault.deleter
        connectMongo
        break;
}})();

module.exports = cartsDAO