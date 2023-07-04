const mongoose = require('mongoose');
const ticketcollection = ('ticket');

const ticketSchema = new mongoose.Schema({
    code: {
        type:String,
        required:true,
    },
    purchase_datetime:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:true,
    },
    purchaser: {
        type:String,
        required:true,
    }
});

const ticketmodel = mongoose.model(ticketcollection,ticketSchema);
module.exports = ticketmodel;