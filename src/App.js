import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  Switch,
  useHistory,
} from "react-router-dom"; //sử dụng thư viện này để chuyển qua lại các components
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
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import ToDoListRedux from "./pages/Todolist/ToDoListRedux";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import ModalHOC from "./HOC/Modal/Modal";
import { useDispatch } from "react-redux";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import indexCyberBugs from "./pages/CyberBugs/ProjectDetail/indexCyberBugs";
import ModalCyberBugs from "./components/Cyberbugs/ModalCyberBugs/ModalCyberBugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import DrawerCyberBugs from "./HOC/CyberbugsHOC/DrawerCyberBugs";
import NotificationComponent from "./components/Notification/NotificationComponent";
import SignUpCyberBugs from "./pages/CyberBugs/LoginCyberBugs/SignUpCyberBugs";
import User from "./pages/CyberBugs/User/User";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history: history });
    return () => {};
  }, []);

  return (
    <>
      <ModalHOC />
      <LoadingComponent />
      <DrawerCyberBugs />
      <NotificationComponent />

      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/about" Component={About} />
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <HomeTemplate exact path="/profile" Component={Profile} />
        <HomeTemplate exact path="/todolistrfc" Component={TodolistRFC} />
        <HomeTemplate exact path="/todolistrcc" Component={TodolistRCC} />
        <HomeTemplate exact path="/todolistredux" Component={ToDoListRedux} />
        <HomeTemplate
          exact
          path="/todolistsaga"
          Component={BaiTapToDoListSaga}
        />
        <HomeTemplate exact path="/demohocmodal" Component={DemoHOCModal} />
        <CyberbugsTemplate exact path="/cyberbugs" Component={indexCyberBugs} />
        <CyberbugsTemplate
          exact
          path="/createProject"
          Component={CreateProject}
        />
        <CyberbugsTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
        <CyberbugsTemplate
          exact
          path="/projectdetail/:projectId"
          Component={indexCyberBugs}
        />
        <CyberbugsTemplate exact path="/user" Component={User} />
        {/* <CyberbugsTemplate exact path="/" Component={ProjectManagement} /> */}
        <UserLoginTemplate exact path="/" Component={LoginCyberBugs} />
        <UserLoginTemplate exact path="/signup" Component={SignUpCyberBugs} />
        <HomeTemplate path="*" Component={PageNotFound} />{" "}
        {/* đá về trang thông báo 404 khi user gõ bậy bạ trên link web */}
      </Switch>
    </>
  );
}

export default App;
