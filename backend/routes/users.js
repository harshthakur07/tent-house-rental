const router = require('express').Router();
let User = require('../models/user.model');
const CUSTOMERS = require('../constants/customers');
const PRODUCTS = require('../constants/products');
const Product = require('../models/product.model');
const Customers = require('../models/customer.model');
const Transaction = require('../models/transaction.model');
const mongoose = require('mongoose');


let print = (value) => console.log(value);

let getUsers = async (req, res) => {
    try {
        let users = await User.find();
        if (users) {
            res.json({
                status: 200,
                success: true,
                data: users
            });
        } else {
            res.json({
                status: 200,
                success: false,
                data: [],
                message: 'No users found.'
            });
        }
    } catch (err) {
        res.status(400).json('Error: ' + err)
    }
}

let seed = async (req, res) => {
    try {
        const db = mongoose.connection;
        // console.log(db.collections);
        // await db.products.drop((err,reply) => {
        //     if(err) throw err;
        // });
        await mongoose.connection.db.dropCollection('products', (err, reply) => {
            if (err) throw err;
            console.log(reply);
        });
        await mongoose.connection.db.dropCollection('customers', (err, reply) => {
            if (err) throw err;
        });
        let transaction = await Transaction.find({});
        console.log(transaction);
        if (transaction && transaction.length > 0) {
            // console.log('inside')
            await mongoose.connection.db.dropCollection('transactions', (err, reply) => {
                if (err) throw err;
                console.log(reply);
            });
        }

        let products = await Product.insertMany(PRODUCTS, {
            ordered: false
        });
        let customers = await Customers.insertMany(CUSTOMERS, {
            ordered: false
        });
        res.json({
            success: true,
            products, customers
        })

    } catch (err) {
        res.status(400).json('Error: ' + err)
    }
}
let login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user && user.password === req.body.password) {
            res.json({
                success: true,
                code: 200,
                isValid: true,
                userData: user
            });
        } else res.json({
            code: 404,
            success: false,
            isValid: false,
            message: 'Wrong Credentials'
        })
    } catch (err) {
        res.status(400).json('Error: ' + err)
    }
}

router.get('/', getUsers);
router.post('/login', login);
router.get('/initialize', seed);


module.exports = router;