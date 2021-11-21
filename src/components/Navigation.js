import React, { useState } from 'react'
import axios from "axios"

import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from 'react-router-dom'
  

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

// Import Tables
import StudentsTable from './StudentsTable'
import InstitutionsTable from './InstitutionsTable'
import DepartmentsTable from './DepartmentsTable'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading]=useState(false)
  const BASE_URL = "https://in607-laravel-api-hoggjt2.herokuapp.com";
  const toggle = () => setIsOpen(!isOpen)

  // State variable for checking if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState( 
    // In session/local storage, all values are of type string
    sessionStorage.getItem("isLoggedIn") === "true" || false 
  );

  const login = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", true); 
    setIsLoading(true);
  };

  const logout = () => {
    axios
      .get(`${BASE_URL}/api/v1/logout`, { 
        headers: { 
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          sessionStorage.clear(); // Clear all items in session storage
          alert("Logged out."); // Debugging purposes
        }
      });
  };

  // Render a NavLink based on whether a user is logged in or out
  const authLink = isLoggedIn ? (
    <>
    <NavItem>
             <NavLink onClick={logout} style={{ cursor: "pointer" }}> 
      Logout
            </NavLink>
    </NavItem>
    </>
  ) : (
    <NavLink href="/login">Login</NavLink>
  );


  return (
    <Router>
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Student Management System</NavbarBrand>
      <NavbarToggler onClick={toggle} /> 
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            {authLink}
          </NavItem>
          <NavItem>
            <NavLink href="/register">Register</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/students">Students</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/institutions">Institutions</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/departments">Departments</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    <Routes>
        <Route path="/login" element={<LoginForm login={login}/>} />
        <Route path='/register' element={<RegisterForm/>} />
        <Route path='/students' element={<StudentsTable/>} />
        <Route path='/institutions' element={<InstitutionsTable/>} />
        <Route path='/departments' element={<DepartmentsTable/>} />
    </Routes>
    </Router>
  )
}

export default Navigation
