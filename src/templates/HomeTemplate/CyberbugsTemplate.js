import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import SidebarCyberbugs from "../../components/Cyberbugs/SidebarCyberbugs";
import "../../index.css";
import Header from "../../components/Home/Header/Header";
import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ContentMain from "../../components/Cyberbugs/Main/ContentMain";
import HeaderMain from "../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../components/Cyberbugs/Main/InfoMain";

// import ModalCyberBugs from "../../components/Cyberbugs/ModalCyberBugs/ModalCyberBugs"

export const CyberbugsTemplate = (props) => {
  const { Component, ...restParam } = props;
  // console.log(Component);
  // console.log(restParam);
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        // console.log(propsRoute);
        return (
          <div className="jira">
            <SidebarCyberbugs />
            <MenuCyberbugs />
            <Component {...propsRoute} />
            {/* <ModalCyberBugs /> */}
          </div>
        );
      }}
      />
      );
};
