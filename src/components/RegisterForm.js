// RegistrationForm.js

import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";
//import { Table, Button, Form, FormGroup, Col } from 'reactstrap'
import { Navigate } from "react-router-dom";

const RegisterForm = () => {
  const BASE_URL = "https://in607-laravel-api-hoggjt2.herokuapp.com";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isHome, setIsHome] = useState(false);
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false); // Used for authentication errors
  const [unknownError, setUnknownError] = useState(false); // Used for network errors
  const [regSuccess, setRegSuccess] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();

    setAuthError(false);
    setUnknownError(false);
    setRegSuccess(false);
    
      axios
        .post(`${BASE_URL}/api/v1/register`, {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        })
        .then((response) => {
          if (response.status === 201) {
            console.log("registered");
            setRegSuccess(true);
          }
        })
        .catch((error) => {
          
          if (error.response.status === 422) {
            setAuthError(true);
          } else {
            setUnknownError(true);
          }
        });
  };

  if (isHome === true) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    <div className="login">
      <h1 style={{ marginTop: "10px" }} >Register</h1>
      {/* 
        When the form is submitted, it will call the handleSubmit 
        function above. You do not need to worry about specifying
        a method and action as you would typically do when dealing 
        with forms
      */}
      <Form onSubmit={handleSubmit} > 
      <FormGroup className="mt-3">
          <Input
            type="name"
            name="name"
            placeholder="Name"
            value={name} 
            //{/* This attribute detects when the value of an input element changes */}
            onChange={(e) => setName(e.target.value)} 
            /*{ 
              You can fetch validation messages from the request. There are plenty 
              of resources that show you how to do this 
            }*/
            required 
          />
        </FormGroup>
        <FormGroup className="mt-3">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email} 
            //{/* This attribute detects when the value of an input element changes */}
            onChange={(e) => setEmail(e.target.value)} 
            /*{ 
              You can fetch validation messages from the request. There are plenty 
              of resources that show you how to do this 
            }*/
            required 
          />
        </FormGroup>
        <FormGroup className="mt-3">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup className="mt-3">
          <Input
            type="password"
            name="password_confirmation"
            placeholder="Password_Confirmation"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </FormGroup>
        {/* 
          Display an alert message if there is either an authentication or network error
        */}
        {authError ? (
          <Alert color="danger">
            Cannot process credentials.
          </Alert>
        ) : null}
        {unknownError ? (
          <Alert color="danger">
            An error has occured.
          </Alert>
        ) : null}
        {regSuccess ? (
          <Alert color="success">
            New User Registered.
          </Alert>
        ) : null}
        <Button className="mt-3">Submit</Button>
      </Form>
      </div>
    </>
  );
};

export default RegisterForm;