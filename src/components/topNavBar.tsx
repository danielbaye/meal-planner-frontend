import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../styles/navBar.css';  // Assuming you have a custom CSS file for styling
import topImage from "../assets/rustic-bread--beer--olives--a-whisk--more-foodstuf.svg"

interface NavBarProps {
    isLoggedIn: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn }) => {
    return (
        <Navbar bg="light" expand="lg" fixed="top" className="custom-navbar">
            <Navbar.Brand href="/main"><img src={topImage} className='navbar-logo'></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {/* Recipes Tab */}
                    <NavDropdown title="Recipes" id="recipes-tab" className="hoverable">
                        <NavDropdown.Item href="/main/tags">Tags</NavDropdown.Item>
                        <NavDropdown.Item href="/i_dont_know_what_to_make">I dont know what do make</NavDropdown.Item>
                        <NavDropdown.Item href="#dinner">Dinner</NavDropdown.Item>
                    </NavDropdown>

                    {/* Features Tab */}
                    <Nav.Link href="#features" className="hoverable">Features</Nav.Link>

                    {/* Conditionally Render User Tab or Login */}
                    {isLoggedIn ? (
                        <>
                            {/* User Info Tab */}
                            <NavDropdown title="User Info" id="user-tab" className="hoverable">
                                <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                            </NavDropdown>

                            {/* My Recipes Tab */}
                            <Nav.Link href="#my_recipes" className="hoverable">My Recipes</Nav.Link>
                        </>
                    ) : (
                        <Nav.Link href="#login" className="hoverable">Login</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;