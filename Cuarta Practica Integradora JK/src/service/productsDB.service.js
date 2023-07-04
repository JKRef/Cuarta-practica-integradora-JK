
class productService  {
    constructor(dao){
        this.dao = dao
    }

    getProduct = (page, limit , sort , query) => this.dao.get(page, limit, sort, query)

    getProductid = (id) => this.dao.getId(id);

    addProduct = (product) => this.dao.create(product);

    UpdateProduct = (id, product) => this.dao.update(id,product);

    DeleteProductId = (id) => this.dao.deleter(id);
}

module.exports = productService