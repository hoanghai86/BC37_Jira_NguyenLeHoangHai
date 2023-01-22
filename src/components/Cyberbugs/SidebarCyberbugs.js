import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, BarsOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormCreateTask from "../Forms/FormCreateTask/FormCreateTask";
const { Header, Sider, Content } = Layout;

export default function SidebarCyberbugs() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    collapsed: true,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
        <div
          className="cursor-pointer text-white text-xl text-center"
          onClick={toggle}
        >
          <BarsOutlined />
        </div>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <PlusOutlined />,
              label: "Create task",
              onClick: () =>{dispatch({
                type: "OPEN_FORM_CREATE_TASK",
                Component: <FormCreateTask />,
                title: "Create Task",
              })}
            },
            {
              key: "2",
              icon: <SearchOutlined />,
              label: "Search",
              onClick: () =>{console.log("Search")}
            },
          ]}
          
        />
        
      </Sider>

      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: "colorBgContainer",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
}
