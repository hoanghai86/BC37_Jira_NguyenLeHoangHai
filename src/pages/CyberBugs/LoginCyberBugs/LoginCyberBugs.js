import React from "react";
import { Button, Input } from "antd";
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined } from "@ant-design/icons";


export default function LoginCyberBugs(props) {
  return (
    <form className="container" style={{ height: window.innerHeight }}>
      <div className="d-flex flex-col justify-center items-center" style={{ height: window.innerHeight }}>
        <h3 className="text-center mb-3">Login CyberBugs</h3>
        <div className="d-flex flex-col">
        <Input name="email" size="large" placeholder="email" prefix={<UserOutlined />} className="w-72"/>
        </div>
        <div className="d-flex flex-col mt-3">
        <Input name="password" size="large" placeholder="password" prefix={<LockOutlined />} className="w-72"/>
        </div>
        <Button size="large" className="mt-5 w-72" style={{backgroundColor:"rgb(102,117,223)", color:"#fff"}}>Login</Button>
        <div className="d-flex mt-3">
            <Button type="primary" shape="circle" icon={<FacebookOutlined />} size="large" className="mr-2 flex items-center justify-center hover:opacity-50" style={{backgroundColor:"#0e2989"}}></Button>
            <Button type="primary" shape="circle" icon={<TwitterOutlined />} size="large" className="flex items-center justify-center"></Button>
        </div>
      </div>
    </form>

  );
}
