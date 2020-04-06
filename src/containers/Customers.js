import React from "react";
import { Button, FormGroup, Table,FormControl, ControlLabel } from "react-bootstrap";
import "./Customers.css";
import axios from 'axios';

export default class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers:[],
            customerName:''
        }
        this.handleName = this.handleName.bind(this);
        this.handleNewCustomer = this.handleNewCustomer.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:9000/customers')
          .then(response => {
            console.log(response);
            if (response.data.success) {
                // console.
              this.setState({
                  customers:response.data.data
              });
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }

    handleName(event) {
        this.setState({customerName: event.target.value});
        
    }
    handleNewCustomer(event) {
        event.preventDefault();
        try {
            axios.post('http://localhost:9000/customers/addCustomer',{name:this.state.customerName})
                .then((res)=>{
                    console.log(res);
                    const previousCustomers = this.state.customers.slice();
                    previousCustomers.push(res.data.data);
                    this.setState({
                        customers:previousCustomers,
                        customerName:''
                    });
                    alert(res.data.message);
                }).catch((err)=>{
                    console.error(err);
                })
            
        } catch (e) {
            alert(e.message);
        }
    }

    render() {
        const customers = this.state.customers;
        console.warn(customers);
        const customersList = customers.map((customer, index)=>{
            return (
                <tr key={customer._id}>
                    <td>{index+1}</td>
                    <td>{customer.name}</td>
                    </tr>
            );
        });
        return (
            <div className="Login">
                <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customersList} 
                        </tbody>
                    </Table>
                <form>
                <FormGroup controlId="password" bsSize="sm">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        value={this.state.customerName}
                        onChange={this.handleName}
                        type="text"
                    />
                </FormGroup>
                <Button block bsSize="sm" onClick={this.handleNewCustomer} type="button">
                    Add New Customer!
                </Button>
                </form>
            </div>
        )
    }
}