import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ModalHOC({ show, handleClose }) {
  let Component = useSelector((state) => state.ModalReducer.Component);

  return (
    // <div className="modalBackground">
    //   <div className="modalContainer">
    //     <button
    //       onClick={() => {
    //         closeModal(false);
    //       }}
    //     >
    //       X
    //     </button>
    //     <div className="title">
    //       <h1>Are you sure you want to continue</h1>
    //     </div>
    //     <div className="body">
    //       <p>The next page is awesome</p>
    //     </div>
    //     <div className="footer">
    //       <button
    //         onClick={() => {
    //           closeModal(false);
    //         }}
    //       >
    //         Cancel
    //       </button>
    //       <button>Continue</button>
    //     </div>
    //   </div>
    // </div>

    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{Component}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
