import React, { Component } from 'react';
import {
  Navbar,
  Nav
} from 'react-bootstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

class TopNavBar extends Component {
    render() {
        return (
            <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Job-Portal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link tag={RRNavLink} href="/">Refresh</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default TopNavBar;
