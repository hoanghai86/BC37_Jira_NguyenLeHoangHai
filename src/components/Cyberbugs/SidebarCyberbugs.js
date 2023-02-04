import React, { useState } from "react";
import { BarsOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
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
              onClick: () => {
                dispatch({
                  type: "OPEN_FORM_CREATE_TASK",
                  Component: <FormCreateTask />,
                  title: "Create Task",
                });
              },
            },
            {
              key: "2",
              icon: <SearchOutlined />,
              label: "Search",
              onClick: () => {
                console.log("Search");
              },
            },
          ]}
        />
      </Sider>
    </Layout>
  );
}
