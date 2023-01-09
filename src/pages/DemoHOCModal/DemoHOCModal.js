import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import ModalHOC from "../../HOC/Modal/Modal";
import Login from "../Login/Login";
import Register from "../Register/Register";

export default function ShowModal() {
  // const [openModal, setOpenModal] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShowLogin = () => {
    setShow(true);
    dispatch({ type: "OPEN_FORM", Component: <Login /> });
  };
  const handleShowRegister = () => {
    setShow(true);
    dispatch({ type: "OPEN_FORM", Component: <Register /> });
  };

  const dispatch = useDispatch();
  return (
    <div>
      <Button variant="primary" onClick={handleShowLogin} className="mr-1">
        Đăng nhập
      </Button>
      <Button variant="primary" onClick={handleShowRegister}>
        Đăng ký
      </Button>
      <ModalHOC show={show} handleClose={handleClose} />
    </div>

    /* <div className="App">
        <h1>Click to open Modal</h1>
        <button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Open
        </button>
      </div>
      <ModalHOC /> */
  );
}
