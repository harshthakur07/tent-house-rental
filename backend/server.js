const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  next();
});


const uri = process.env.DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Database connected Successfully!");
})

const customerRouter = require('./routes/customers');
const productsRouter = require('./routes/products');
const transactionRouter = require('./routes/transactions');
const usersRouter = require('./routes/users');

app.use('/customers', customerRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/transactions',transactionRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
process.on('uncaughtException', function (err) {
  console.log(err)
})
