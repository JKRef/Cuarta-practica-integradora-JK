const userModel = require('../dao/models/user.model');

class sessionService {
    constructor(dao){
        this.dao = dao
    }

    getSession = (email, password) => this.dao.get({email,password});

    getUserId = (id) => this.dao.getId(id);

    getEmail = async (email) => this.dao.getEmail(email);

    createUser = (user) => this.dao.create(user);

    updateUser = (id, user) => this.dao.update(id, user);
}

module.exports = sessionService