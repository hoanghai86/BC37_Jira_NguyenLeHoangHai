import React from "react";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom"; //sử dụng thư viện này để chuyển qua lại các components
import Header from "./components/Home/Header/Header";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Detail from "./pages/Detail/Detail";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import TodolistRFC from "./pages/Todolist/TodolistRFC";
import TodolistRCC from "./pages/Todolist/TodolistRCC";
import {HomeTemplate} from './templates/HomeTemplate/HomeTemplate'
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import ToDoListRedux from "./pages/Todolist/ToDoListRedux";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Modal from "./HOC/Modal/Modal";

function App() {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes> */}
      <Header />
      <Modal />
      <LoadingComponent />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/todolistrfc" component={TodolistRFC} />
        <Route exact path="/todolistrcc" component={TodolistRCC} />
        <Route exact path="/todolistredux" component={ToDoListRedux} />
        <Route exact path="/todolistsaga" component={BaiTapToDoListSaga} />
        <Route exact path="/demohocmodal" component={DemoHOCModal} />


        <Route exact path="/" component={Home} />
        <Route path="*" component={PageNotFound}/>  {/* đá về trang thông báo 404 khi user gõ bậy bạ trên link web */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
