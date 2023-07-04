const cartsModel = require('../dao/models/carts.model');
const ticketModel = require('../dao/models/ticket.model');

class CartManagerDB {
    getId = (id) => cartsModel.findById(id).lean().populate('products.product');
    create = (carts) => cartsModel.create(carts);
    update = (cid,cart)=> cartsModel.updateOne(cid,cart);
    crateTicket = (ticket) => ticketModel.create(ticket) 
  
}




module.exports = new CartManagerDB ;

