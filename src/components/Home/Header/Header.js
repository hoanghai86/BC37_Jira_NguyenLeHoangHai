import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";


export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <div className="container mx-auto">
        <Link to="/home" className="text-white text-3xl hover:no-underline">CyberLearn</Link>
        <Nav className="me-auto">
          <NavLink to="/home" activeStyle={{fontWeight:"bold", background:"white", color: "black"}} className="text-slate-50 px-2 hover:text-gray-400 hover:no-underline">Home</NavLink>
          <NavLink to="/about" activeStyle={{fontWeight:"bold", background:"white", color: "black"}} className="text-slate-50 px-2 hover:text-gray-400 hover:no-underline ">About</NavLink>
          <NavLink to="/contact" activeStyle={{fontWeight:"bold", background:"white", color: "black"}} className="text-slate-50 px-2 hover:text-gray-400 hover:no-underline ">Contact</NavLink>
          <NavLink to="/login" activeStyle={{fontWeight:"bold", background:"white", color: "black"}} className="text-slate-50 px-2 hover:text-gray-400 hover:no-underline ">Login</NavLink>
        </Nav>
      </div>
    </Navbar>
  );
}
