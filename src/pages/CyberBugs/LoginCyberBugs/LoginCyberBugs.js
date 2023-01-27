import React from "react";
import { Button, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { USER_SIGNIN_API } from "../../../redux/constants/Cyberbugs/Cyberbugs";
import { signinCyberbugAction } from "../../../redux/actions/CyberBugsAction";
import { Link, NavLink } from "react-router-dom";

function LoginCyberBugs(props) {
  
  console.log(props)


  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="d-flex flex-col justify-center items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center mb-3">Sign in to Cyberbugs</h3>
        <div className="d-flex flex-col">
          <Input
            onChange={handleChange}
            name="email"
            size="large"
            placeholder="email"
            prefix={<MailOutlined />}
            className="w-72"
          />
        </div>
        <div className="text-danger">{errors.email}</div>
        <div className="d-flex flex-col mt-3">
          <Input
            onChange={handleChange}
            type="password"
            name="password"
            size="large"
            placeholder="password"
            prefix={<LockOutlined />}
            className="w-72"
          />
        </div>
        <div className="text-danger">{errors.password}</div>   
        <Button
          htmlType="submit"
          size="large"
          className="mt-4 w-72"
          style={{ backgroundColor: "rgb(102,117,223)", color: "#fff" }}
        >
          Login
        </Button>
        <div className="mt-1">
          <div className="inline mr-1">Chưa có tài khoản?</div>
          <Link to="/signup" size="large" className="mt-2 inline">Sign up</Link>
        </div>
        <div className="d-flex mt-3">
          <Button
            type="primary"
            shape="circle"
            icon={<FacebookOutlined />}
            size="large"
            className="mr-2 flex items-center justify-center hover:opacity-50"
            style={{ backgroundColor: "#0e2989" }}
          ></Button>
          <Button
            type="primary"
            shape="circle"
            icon={<TwitterOutlined />}
            size="large"
            className="flex items-center justify-center"
          ></Button>
        </div>
      </div>
    </form>
  );
}

const LoginCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("email is invalid!"),
    password: Yup.string()
      .min(6, "password must have min 6 characters")
      .max(32, "password have max 32 characters"),
  }),

  handleSubmit: ({ email, password }, { props, setSubmitting }) => {
    // let action = {
    //   type: USER_SIGNIN_API,
    //   userLogin: {
    //     email: values.email,
    //     password: values.password,
    //   },
    // };
    // setSubmitting(true);
    props.dispatch(signinCyberbugAction(email, password));

    // console.log(props);
    // console.log(values);
  },

  displayName: "Login CyberBugs",
})(LoginCyberBugs);

export default connect()(LoginCyberBugsWithFormik);
