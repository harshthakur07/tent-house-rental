const router = require('express').Router();
let User = require('../models/user.model');
const CUSTOMERS = require('../constants/customers');
const PRODUCTS = require('../constants/products');
const Product = require('../models/product.model');
const Customers = require('../models/customer.model');
const Transaction = require('../models/transaction.model');
const mongoose = require('mongoose');


let print = (value) => console.log(value);

let getTransactions = async (req, res) => {
    try {
        let transactionList = await Transaction.aggregate([{$sort:{dateAndTime:1}}]);
        if (transactionList) {
            res.json({
                status: 200,
                success: true,
                data: transactionList
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


let addTransaction = async (req,res) => {
    try {
        if(!req.body.customerId || !req.body.productId || !req.body.type || !req.body.quantity) res.json({
            code:400,
            status:'Bad Request',
            message:'Required data missing'
        });
        const customerId = req.body.customerId;
        const productId = req.body.productId;
        const type = req.body.type;
        const quantity = req.body.quantity;
        const transactionBody = {
            customerId,productId,type,quantity
        }
        let product = await Product.findOne({_id:mongoose.Types.ObjectId(productId)});
        console.log(product)
        if(product) {
            if(type === 'Out'){
                if(product.booked + quantity > product.total) {res.json({
                    status:200,
                    success:true,
                    message:'Not enough quantity left to Rent out'
                }); return;}
                else product.booked += quantity;
                let updateProduct = new Product(product);
                await updateProduct.save();
            } else {
                if(product.total < quantity) {res.json({
                    status:200,
                    success:true,
                    message:'Not a valid quantity'
                }); return}
                else product.booked -= quantity;
                let updateProduct = new Product(product);
                await updateProduct.save();
            }
            
        }
        let insertTransaction = await Transaction.create(transactionBody);
        if(insertTransaction)  res.json({
            success:true,
            message:'Inserted Successfully',
            data:insertTransaction,
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

router.get('/', getTransactions);
router.post('/addNewTransaction',addTransaction);

module.exports = router;