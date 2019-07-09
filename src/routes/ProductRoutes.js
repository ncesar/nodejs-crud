module.exports = (app) => {
    const products = require('../controllers/ProductController');

    //create a new product
    app.post('/products', products.create);

    //retrive all products
    app.get('/products', products.findAll);

    //retrive a single product with productId
    app.get('/products/:productId', products.findOne);

    //update a note with productId
    app.put('/products/:productId', products.update);

    //delete a note with productId
    app.delete('/products/:productId', products.delete);
}