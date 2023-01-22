import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ModalCyberBugs from "../ModalCyberBugs/ModalCyberBugs";

export default function ContentMain(props) {
  const { projectDetail } = props;

  const renderCardTaskList = () => {
    return projectDetail.lstTask?.map((taskListDetail, index) => {
      return (
          <div className="pr-2" key={index}>
            <div
              className="card px-2 py-2"
              style={{ width: "17rem", height: "26rem" }}
            >
              <div className="card-header">{taskListDetail.statusName}</div>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item mb-2"
                  data-toggle="modal"
                  data-target="#infoModal"
                  style={{ cursor: "pointer" }}
                  onClick={handleShow}
                >
                  <p>
                    Each issue has a single reporter but can have multiple
                    assignees
                  </p>
                  <div className="block" style={{ display: "flex" }}>
                    <div className="block-left">
                      <i className="fa fa-bookmark mr-2" />
                      <i className="fa fa-arrow-up" />
                    </div>
                    <div className="block-right">
                      <div className="avatar-group" style={{ display: "flex" }}>
                        <div className="avatar">
                          <img
                            src={require("../../../assets/img/download (1).jfif")}
                            alt=""
                          />
                        </div>
                        <div className="avatar">
                          <img
                            src={require("../../../assets/img/download (2).jfif")}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
      );
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="content mt-3" style={{ display: "flex" }}>
        {renderCardTaskList()}

        {/* <div className="pr-2">
          <div
            className="card px-2 py-2"
            style={{ width: "17rem", height: "26rem" }}
          >
            <div className="card-header">BACKLOG 3</div>
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item mb-2"
                data-toggle="modal"
                data-target="#infoModal"
                style={{ cursor: "pointer" }}
                onClick={handleShow}
              >
                <p>
                  Each issue has a single reporter but can have multiple
                  assignees
                </p>
                <div className="block" style={{ display: "flex" }}>
                  <div className="block-left">
                    <i className="fa fa-bookmark mr-2" />
                    <i className="fa fa-arrow-up" />
                  </div>
                  <div className="block-right">
                    <div className="avatar-group" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img
                          src={require("../../../assets/img/download (1).jfif")}
                          alt=""
                        />
                      </div>
                      <div className="avatar">
                        <img
                          src={require("../../../assets/img/download (2).jfif")}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item mb-2">
                <p>
                  Each issue has a single reporter but can have multiple
                  assignees
                </p>
                <div className="block" style={{ display: "flex" }}>
                  <div className="block-left">
                    <i className="fa fa-check-square mr-2" />
                    <i className="fa fa-arrow-up" />
                  </div>
                  <div className="block-right">
                    <div className="avatar-group" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img
                          src={require("../../../assets/img/download (1).jfif")}
                          alt=""
                        />
                      </div>
                      <div className="avatar">
                        <img
                          src={require("../../../assets/img/download (2).jfif")}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>


        </div>

        <div className="px-2">
          <div
            className="card px-2 py-2"
            style={{ width: "17rem", height: "26rem" }}
          >
            <div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item mb-2">Cras justo odio</li>
              <li className="list-group-item mb-2">Dapibus ac facilisis in</li>
            </ul>
          </div>
        </div>

        <div className="px-2">
          <div
            className="card px-2 py-2"
            style={{ width: "17rem", height: "26rem" }}
          >
            <div className="card-header">IN PROGRESS 2</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item mb-2">Cras justo odio</li>
              <li className="list-group-item mb-2">Dapibus ac facilisis in</li>
            </ul>
          </div>
        </div>

        <div className="px-2">
          <div
            className="card px-2 py-2"
            style={{ width: "17rem", height: "26rem" }}
          >
            <div className="card-header">DONE 3</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item mb-2">Cras justo odio</li>
              <li className="list-group-item mb-2">Dapibus ac facilisis in</li>
              <li className="list-group-item mb-2">Vestibulum at eros</li>
            </ul>
          </div>
        </div> */}
      </div>

      <ModalCyberBugs show={show} handleClose={handleClose} />
    </>
  );
}
