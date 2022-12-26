import React from "react";
import {Link, NavLink} from "react-router-dom"

export default function Header() {
  return (
    <header className="bg-slate-900 h-20">
    <div className="container h-full mx-auto flex justify-start items-center">
      <Link to="/" className="text-2xl text-white">
        Cyber Movie
      </Link>
      <Link to="/home" className="text-white px-2">Home</Link>
      <Link to="/about" className="text-white px-2">About</Link>
      <Link to="/contact" className="text-white px-2">Contact</Link>
     
    </div>
  </header>
  );
}
