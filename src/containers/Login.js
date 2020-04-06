import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import axios from 'axios';

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            //   await Auth.signIn(email, password);
            //   alert("Logged in");
            const user = {
                email,
                password
              }
          
              axios.post('http://localhost:9000/users/login', user)
                .then(res =>{
                    res = res.data;
                    if(res.success===true && res.isValid === true) {
                        props.userHasAuthenticated(true);
                        localStorage.setItem('isLoggedIn',true);
                        props.history.push("/products");
                    } else {
                        props.userHasAuthenticated(false);
                        alert('Wrong Credientials. Please try again.')
                    }
                });
          
          
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Login
        </Button>
            </form>
        </div>
    );
}