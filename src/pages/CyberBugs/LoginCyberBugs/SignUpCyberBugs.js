import React from "react";
import { Button, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export default function SignUpCyberBugs() {
  
  return (
    <form
    //   onSubmit={}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="d-flex flex-col justify-center items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center mb-3">Sign up to Cyberbugs</h3>
        <div className="d-flex flex-col">
          <Input
            // onChange=''
            name="email"
            size="large"
            placeholder="email"
            prefix={<UserOutlined />}
            className="w-72"
          />
        </div>
        <div className="d-flex flex-col mt-3">
          <Input
            // onChange={}
            type="password"
            name="password"
            size="large"
            placeholder="password"
            prefix={<LockOutlined />}
            className="w-72"
          />
        </div>
        <div className="d-flex flex-col mt-3">
          <Input
            // onChange={}
            type="text"
            name="name"
            size="large"
            placeholder="name"
            prefix={<LockOutlined />}
            className="w-72"
          />
        </div>
        <div className="d-flex flex-col mt-3">
          <Input
            // onChange={}
            type="text"
            name="phoneNumber"
            size="large"
            placeholder="phoneNumber"
            prefix={<LockOutlined />}
            className="w-72"
          />
        </div>
        <Button
          htmlType="submit"
          size="large"
          className="mt-4 w-72"
          style={{ backgroundColor: "rgb(102,117,223)", color: "#fff" }}
        >
          Sign Up
        </Button>    
      </div>
    </form>
  );
}

