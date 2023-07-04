const nodeMailer = require('nodemailer')
const { MAILING } = require('../config/config')

class Mailing {
    constructor() {
       this.transporter = nodeMailer.createTransport({
        service:'gmail',
        auth: {
            user:MAILING.user  ,
            pass:MAILING.password
        }
       }) 
    }
    sendMail = ({to, subject, html}) => this.transporter.sendMail({to, subject, html})
       
    
}

module.exports = new Mailing()