import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";


export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <div className="container mx-auto">
        <Link to="/home" className="text-white text-3xl hover:no-underline">CyberLearn</Link>
        <Nav className="me-auto">
          <Link to="/home" className="text-slate-50 px-2 hover:text-gray-400 hover:no-underline ">Home</Link>
          <Link to="/about" className="text-slate-50 px-2 hover:text-gray-400 hover:no-underline ">About</Link>
          <Link to="/contact" className="text-slate-50 px-2 hover:text-gray-400 hover:no-underline ">Contact</Link>
        </Nav>
      </div>
    </Navbar>
  );
}
