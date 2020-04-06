import React from "react";
import { Button, Radio,Table,FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Transactions.css";
import axios from 'axios';


export default class Transactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            products: [],
            customers: [],
            productId: '',
            customerId: '',
            type: '',
            quantity: 0
        }
        this.handleproductId = this.handleproductId.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
        this.handlecustomerId = this.handlecustomerId.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleTransactionSubmit = this.handleTransactionSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:9000/transactions')
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    // console.
                    this.setState({
                        transactions: response.data.data
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('http://localhost:9000/products')
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    // console.
                    this.setState({
                        products: response.data.data
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('http://localhost:9000/customers')
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    // console.
                    this.setState({
                        customers: response.data.data
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })


    }

    handleproductId(event) {
        console.log('changes');
        this.setState({ productId: event.target.value });
    }
    handlecustomerId(event) {
        console.log('changes');
        this.setState({ customerId: event.target.value });
    }
    handleType(event) {
        console.log(event.target.value)
        this.setState({ type: event.target.value });
    }
    handleQuantity(event) {
        console.log(event.target.value)
        this.setState({ quantity: +(event.target.value) });
    }

    validateForm() {
        console.log('check')
        return this.state.productId !== '' && this.state.customerId !== '' && this.state.type !== '' && this.state.quantity !== 0;
    }

    handleTransactionSubmit() {
        try {
            const transactionBody = {
                customerId: this.state.customerId,
                productId: this.state.productId,
                type: this.state.type,
                quantity: this.state.quantity
            }
            axios.post('http://localhost:9000/transactions/addNewTransaction', transactionBody)
                .then((res) => {
                    console.log(res);
                    const previousTransactions = this.state.transactions.slice();
                    if(res.data.data){
                        previousTransactions.push(res.data.data);
                        this.setState({
                            transactions: previousTransactions
                        });
                    }
                    alert(res.data.message);
                }).catch((err) => {
                    console.error(err);
                })

        } catch (e) {
            alert(e.message);
        }

    }

    render() {

        const transactions = this.state.transactions;
        const transactionList = transactions.map((transaction,index) => {
            return (
                <tr key={transaction._id    }>
                    <td>{index+1}</td>
                    <td>{transaction._id}</td>
                    <td>{transaction.dateAndTime}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.quantity}</td>
                    </tr>
            );
        });
        const products = this.state.products;
        const productList = products.map((e) => {
            return (<option value={e._id}>{e.title}</option>)
        })
        const customers = this.state.customers;
        // console.warn(customers);
        const customersList = customers.map((customer) => {
            return <option value={customer._id}>{customer.name}</option>
        });




        return (
            <div className="Login">
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Transaction Id</th>
                                <th>Date and Type</th>
                                <th>Type of Transaction</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionList}
                        </tbody>
                    </Table>
                <form onSubmit={this.handleTransactionSubmit}>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Products</ControlLabel>
                        <FormControl componentClass="select" onChange={this.handleproductId} placeholder="select product">
                            <option value="">Please Select</option>
                            {productList}
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Customers</ControlLabel>
                        <FormControl componentClass="select" onChange={this.handlecustomerId} placeholder="select customer">
                            <option value="">Please Select</option>
                            {customersList}
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formInlineName">
                        <ControlLabel>Quantity</ControlLabel>{' '}
                        <FormControl type="text" onChange={this.handleQuantity} placeholder="Quantity" />
                    </FormGroup>{' '}
                    <FormGroup>
                        <Radio name="radioGroup" onChange={this.handleType} value="Out" inline>Out</Radio>{' '}
                        <Radio name="radioGroup" onChange={this.handleType} value="In" inline>In</Radio>{' '}
                    </FormGroup>

                    <Button block bsSize="sm" onClick={this.handleTransactionSubmit} type="button">
                        Add Transaction Entry!
                </Button>
                </form>
            </div>
        )

    }
}   
