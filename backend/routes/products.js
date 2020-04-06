const router = require('express').Router();
let User = require('../models/user.model');
const CUSTOMERS = require('../constants/customers');
const PRODUCTS = require('../constants/products');
const Product = require('../models/product.model');
const Customers = require('../models/customer.model');
const Transaction = require('../models/transaction.model');
const mongoose = require('mongoose');


let print = (value) => console.log(value);

let getProducts = async (req, res) => {
    try {
        let productsList = await Product.aggregate([{$sort:{title:1}}]);
        if (productsList) {
            res.json({
                status: 200,
                success: true,
                data: productsList
            });
        } else {
            res.json({
                status: 204,
                success: false,
                data: [],
                message: 'No customer found.'
            });
        }
    } catch (err) {
        res.status(400).json('Error: ' + err)
    }
}



router.get('/', getProducts);




module.exports = router;