const router = require('express').Router();
let User = require('../models/user.model');
const CUSTOMERS = require('../constants/customers');
const PRODUCTS = require('../constants/products');
const Product = require('../models/product.model');
const Customers = require('../models/customer.model');
const Transaction = require('../models/transaction.model');
const mongoose = require('mongoose');


let print = (value) => console.log(value);

let getCustomers = async (req, res) => {
    try {
        let customers = await Customers.aggregate([{$sort:{name:1}}]);
        if (customers) {
            res.json({
                status: 200,
                success: true,
                data: customers
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

let addCustomer = async (req,res) => {
    try {
        const name = req.body.name;
        if(!name) res.json({
            code:400, message:'Name is empty'
        });
        let insertCustomer = await Customers.create({name});
        if(insertCustomer)  res.json({
            success:true,
            message:'Inserted Successfully',
            data:insertCustomer,
            code:201
        })
        else res.json({
            success:false,
            code:204,
            message:'Some error occured'
        })
    } catch (err) {
        res.status(400).json('Error: ' + err)
    }
}




router.get('/', getCustomers);
router.post('/addCustomer', addCustomer);




module.exports = router;