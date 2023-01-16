import React, { useState } from "react";
import {
  BarsOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

const { Sider } = Layout;

export default function SidebarCyberbugs() {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  return (
    // <div className="sideBar">
    //   <div className="sideBar-top">
    //     <div className="sideBar-icon text-white">
    //       <i className="fab fa-jira" />
    //     </div>
    //     <div
    //       className="sideBar-icon text-white"
    //       data-toggle="modal"
    //       data-target="#searchModal"
    //       style={{ cursor: "pointer" }}
    //     >
    //       <i className="fa fa-search" />
    //       <span className="title ml-3">SEARCH ISSUES</span>
    //     </div>
    //     <div className="sideBar-icon text-white">
    //       <i className="fa fa-plus" />
    //       <span className="title ml-3">CREATE ISSUES</span>
    //     </div>
    //   </div>
    //   <div className="sideBar-bottom text-white">
    //     <div className="sideBar-icon">
    //       <i className="fa fa-question-circle" />
    //       <span className="title ml-3">ABOUT</span>
    //     </div>
    //   </div>
    // </div>

      <Layout>
        <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div className="cursor-pointer text-white text-xl text-center" onClick={toggle} ><BarsOutlined /></div>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <PlusOutlined />,
                label: "Create issue",
              },
              {
                key: "2",
                icon: <SearchOutlined />,
                label: "Search",
              },
            ]}
          />
        </Sider>
      </Layout>

  );
}
