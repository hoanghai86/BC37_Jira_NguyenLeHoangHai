import React from "react";
import { Button, Form, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { postUserRegisterAction } from "../../../redux/actions/UserAction";

export default function SignUpCyberBugs() {
  const hadleSubmit = (value) => {
    postUserRegisterAction(value);
  };
  return (
    <div className="container" style={{ height: window.innerHeight }}>
      <div
        className="d-flex flex-col justify-center items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center mb-3">Sign up to Cyberbugs</h3>
        <Form onFinish={hadleSubmit}>
          <Form.Item name="email">
            <Input
              className="w-72"
              size="large"
              placeholder="email"
              prefix={<MailOutlined />}
            />
          </Form.Item>
          <Form.Item name="name">
            <Input
              className="w-72"
              size="large"
              placeholder="name"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item name="phoneNumber">
            <Input
              className="w-72"
              size="large"
              placeholder="phone"
              prefix={<PhoneOutlined />}
            />
          </Form.Item>
          <Form.Item name="passWord">
            <Input
              type="password"
              className="w-72"
              size="large"
              placeholder="password"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              size="large"
              style={{
                width: "100%",
                backgroundColor: "rgb(102,117,223)",
                color: "#fff",
              }}
              className="mt-1"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        {/* <Button
          htmlType="submit"
          size="large"
          className="mt-4 w-72"
          style={{ backgroundColor: "rgb(102,117,223)", color: "#fff" }}
        >
          Sign Up
        </Button> */}
      </div>
    </div>
  );
}
