const daoProducts = require('../dao/ProductManagerDB')
const daoCarts = require('../dao/CartManagerDB')
const daoSession = require('../dao/sessionManager')

const productService = require('../service/productsDB.service')
const cartsService = require('../service/cartsDB.service')
const sessionService = require('../service/session.service')

const productServices = new productService(daoProducts)
const cartServices = new cartsService(daoCarts)
const sessionServices = new sessionService(daoSession)

module.exports ={
    productServices,
    cartServices,
    sessionServices
}