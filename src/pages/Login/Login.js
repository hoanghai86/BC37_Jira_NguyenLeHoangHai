import React, { useState } from "react";

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({ userName: "", passWord: "" });

  console.log(userLogin);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault(); //chặn sự kiện load lại trang
    if (
      userLogin.userName === "cyberlearn" &&
      userLogin.passWord === "cyberlearn"
    ) {
      //thành công thì chuyển về trang trước đó
      //props.history.goBack();

      //chuyển đến trang chỉ định sau khi xử lý
      //chuyển hướng đến path tương ứng
      props.history.push('/home');

      //thay đổi nội dung path tương ứng
      props.history.replace('/home');

    } else {
      alert("Login fail !");
      return;
    }
  };

  return (
    <form className="container" onSubmit={handleLogin}>
      <h3 className="display-4">Login</h3>
      <div className="form-group">
        <p>Tài khoản</p>
        <input
          name="userName"
          className="form-control"
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p>Tài khoản</p>
        <input
          name="passWord"
          className="form-control"
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-success">Đăng nhập</button>
      </div>
    </form>
  );
}