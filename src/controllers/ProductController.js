const Product = require('../models/Product');

//Create new Product

exports.create = (req, res) => {
    //Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Product content cant be empty."
        })
    }

    //Create a new product
    const product = new Product({
        title: req.body.title || "No product title",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    });

    //save created product in database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            messagE: err.message || "Something went wrong."
        });
    });
}

    //retrive all products from database
    exports.findAll = (req, res) => {
        Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });
    }

    //find a single product by ID
    exports.findOne = (req, res) => {
        Product.findById(req.params.productId)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Productn not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id" + req.params.productId
                });
            }
            return res.status(500).send({
                message: 'Something wrong retriving the id ' +req.params.productId
            })
        })
    };

    //update product
    exports.update = (req, res) => {
        //validate request
        if(!req.body) {
            return res.status(400).send({
                message: "Product content can not be empty"
            });
        }

        //find and update product with the request body
        Product.findByIdAndUpdate(req.params.productId, {
            title: req.body.title || "No product title",
            description: req.body.description,
            price: req.body.price,
            company: req.body.company
        }, { new: true })
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Product not found with id "+ req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Produt not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "something went wrong updating the id "+ req.params.productId
            });
        });
    }

    //delete a note wit hthe specified noteId in the request
    exports.delete = (req, res) => {
        Product.findByIdAndDelete(req.params.productId)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Product not found with id " +req.params.productId
                });
            }
            res.send({ message: "Product deleted successfully!" });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + req.params.productId
            });
        });
    }