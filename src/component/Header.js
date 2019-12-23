import React, { Component } from 'react';

import NavLink from 'react-router-dom/NavLink';
import logo from '../logo.svg';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../css/App.css';

class Header extends Component {
    render() {
        return (
            <Navbar id="headerView" className="shadow" sticky="top">
                <Container>
                    <Navbar.Brand className="mr-auto" href="/">
                        <div>
                            <img src={logo} className="Header-logo" alt="logo" />
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="Header-text border-left">
                        <NavLink className="text-light p-3" to="/">Home</NavLink>
                        <NavLink className="text-light p-3" to="/About">About Us</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default Header;
