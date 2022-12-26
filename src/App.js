import React from "react";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom"; //sử dụng thư viện này để chuyển qua lại các components
import Header from "./components/Home/Header/Header";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes> */}
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
