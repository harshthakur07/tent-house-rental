import React from "react";
import { Table} from "react-bootstrap";
import "./Products.css";
import axios from 'axios';


export default class Products extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            products : []
        }
    };
    componentDidMount() {
        axios.get('http://localhost:9000/products')
          .then(response => {
            console.log(response);
            if (response.data.success) {
                // console.
              this.setState({
                products:response.data.data
              })
            }
          })
          .catch((error) => {
            console.log(error);
        })
    
    }
 
    render() {
        const products = this.state.products || [];
        const productList = products.map((e,index) => {
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{e.title}</td>
                    <td>{e.total}</td>
                    <td>{e.booked}</td>
                    <td>{e.pricePerDay}</td>
                    </tr>
            );
        });
        return (
            <div>
                <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Total</th>
                                <th>Booked</th>
                                <th>Price Per Day</th>
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