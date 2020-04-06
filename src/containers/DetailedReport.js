import React from "react";
import { Table} from "react-bootstrap";
import "./Reports.css";
import axios from 'axios';


export default class DetailedReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            products: [],
            customers: []
        }
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
            });
    }
    render() {
        const products = this.state.products || [];
        const productList = products.map((e, index) => {
            return (
                <div>
                    {/* <h4>
                    Item Name: <Label>{e.title}</Label>
                    </h4>
                    <h4>
                    Available Quantity: <Label>{e.total - e.booked}</Label>
                    </h4>
                    <h4>-----</h4> */}
                    <p>Item Name: {e.title}</p>
                    <p>Available Quantity: {e.total - e.booked}</p>
                    <p>--------</p>

                </div>
            );
        });
        const transactions = this.state.transactions;
        const transactionList = transactions.map((transaction, index) => {
            return (
                <tr key={transaction._id}>
                    <td>{index + 1}</td>
                    <td>{transaction._id}</td>
                    <td>{transaction.dateAndTime}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.quantity}</td>
                </tr>
            );
        });
        return (
            <div>
                    {productList}

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
            </div>
        );
    }

}