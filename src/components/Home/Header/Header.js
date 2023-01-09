import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";


export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <div className="container mx-auto">
        <Link to="/home" className="text-white text-3xl hover:no-underline">CyberLearn</Link>
        <Nav className="me-auto">
          <NavLink to="/home" activeStyle={{fontWeight:"bold", background:"white", color: "black"}} className="text-slate-50 px-2 hover:text-gray-400 hover:no-underline flex items-center">Home</NavLink>
          <NavLink to="/about" activeStyle={{fontWeight:"bold", background:"white", color: "black"}} className="text-slate-50 px-2 hover:text-gray-400 hover:no-underline flex items-center">About</NavLink>
          <NavLink to="/contact" activeStyle={{fontWeight:"bold", background:"white", color: "black"}} className="text-slate-50 px-2 hover:text-gray-400 hover:no-underline flex items-center">Contact</NavLink>
          <NavLink to="/login" activeStyle={{fontWeight:"bold", background:"white", color: "black"}} className="text-slate-50 px-2 hover:text-gray-400 hover:no-underline flex items-center">Login</NavLink>
          <NavLink to="/profile" activeStyle={{fontWeight:"bold", background:"white", color: "black"}} className="text-slate-50 px-2 hover:text-gray-400 hover:no-underline flex items-center">Profile</NavLink>
          <NavLink to="/demohocmodal" activeStyle={{fontWeight:"bold", background:"white", color: "black"}} className="text-slate-50 px-2 hover:text-gray-400 hover:no-underline flex items-center">Demo HOC</NavLink>

          <NavDropdown title="Bài tập">
            <NavLink to="/todolistrfc" className="text-black px-2 hover:text-white hover:bg-gray-700 hover:no-underline flex items-center">To do list RFC</NavLink>
            <NavLink to="/todolistrcc" className="text-black px-2 hover:text-white hover:bg-gray-700 hover:no-underline flex items-center">To do list RCC</NavLink>          
            <NavLink to="/todolistredux" className="text-black px-2 hover:text-white hover:bg-gray-700 hover:no-underline flex items-center">To do list Redux</NavLink>          
            <NavLink to="/todolistsaga" className="text-black px-2 hover:text-white hover:bg-gray-700 hover:no-underline flex items-center">To do list Saga</NavLink>          
          </NavDropdown>

        </Nav>
      </div>
    </Navbar>
  );
}
