import React from "react";
import { Table} from "react-bootstrap";
import "./Reports.css";
import axios from 'axios';


export default  class Reports extends React.Component {
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
        const productList = products.map((e,index) => {
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{e.title}</td>
                    <td>{e.total - e.booked}</td>
                    </tr>
            );
        });
        return (
            <div>
                <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item Name</th>
                                <th>Available Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList}
                        </tbody>
                    </Table>
            </div>
        );
    }

}