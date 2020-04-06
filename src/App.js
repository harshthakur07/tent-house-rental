import React, { useState } from "react";
import './App.css';
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import axios from 'axios';


function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const  isLoggedIn = localStorage.getItem('isLoggedIn') || false;
  function handleLogout() {
    userHasAuthenticated(false);
    localStorage.clear();
    props.history.push("/login");
  }

  // Method to trigger Initialization
  function handleInitializtion() {
    axios.get('http://localhost:9000/users/initialize').then((res)=>{
      if(res.data.success === true) alert('Initialized Successfully');
      props.history.push("/products");
    }).catch(e => {
      console.error(e);
    })
  }

  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Tent House Rental</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isLoggedIn || isAuthenticated
              ? <>
                  <NavItem onClick={handleInitializtion}>Initialize</NavItem>
                <LinkContainer to="/products">
                  <NavItem>Products</NavItem>
                </LinkContainer>
                <LinkContainer to="/customers">
                  <NavItem>Customers</NavItem>
                </LinkContainer>
                <LinkContainer to="/transactions">
                  <NavItem>Transactions</NavItem>
                </LinkContainer>
                <LinkContainer to="/inventory-summary-reports">
                  <NavItem>Inventory Summary Reports</NavItem>
                </LinkContainer>
                <LinkContainer to="/inventory-detailed-reports">
                  <NavItem>Inventory Detailed Reports</NavItem>
                </LinkContainer>
                <NavItem onClick={handleLogout}>Logout</NavItem>
              </>
              : <>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(App);
