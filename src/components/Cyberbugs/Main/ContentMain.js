import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from "../../../redux/constants/Cyberbugs/TaskConstants";
import ModalCyberBugs from "../ModalCyberBugs/ModalCyberBugs";

export default function ContentMain(props) {
  const { projectDetail } = props;
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    let { projectId, taskId } = JSON.parse(result.draggableId); //Lấy ra chuỗi sau mỗi lần draggable
    let { source, destination } = result;
    // console.log(result);

    if (!result.destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    //Gọi api cập nhật lại status
    dispatch({
      type: UPDATE_STATUS_TASK_SAGA,
      taskUpdateStatus: {
        taskId: taskId,
        statusId: destination.droppableId,
        projectId: projectId,
      },
    });
  };

  const renderCardTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail.lstTask?.map((taskListDetail, index) => {
          return (
            <Droppable key={index} droppableId={taskListDetail.statusId}>
              {(provided) => {
                return (
                  <div className="pr-2 w-1/4">
                    <div
                      className="card px-2 py-2"
                      style={{ width: "15rem", height: "auto" }}
                    >
                      <div className="card-header">
                        {taskListDetail.statusName}
                      </div>
                      <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        key={index}
                        className="list-group list-group-flush"
                      >
                        {taskListDetail.lstTaskDeTail?.map((task, index) => {
                          return (
                            <Draggable
                              key={task.taskId.toString()}
                              index={index}
                              draggableId={JSON.stringify({projectId:task.projectId, taskId:task.taskId})}
                            >
                              {(provided) => {
                                return (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    key={index}
                                    className="list-group-item mb-2"
                                    data-toggle="modal"
                                    data-target="#infoModal"
                                    // style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      dispatch({
                                        type: GET_TASK_DETAIL_SAGA,
                                        taskId: task.taskId,
                                      });
                                      handleShow();
                                    }}
                                  >
                                    <p className="font-light">
                                      {task.taskName}
                                    </p>
                                    <div
                                      className="block"
                                      style={{ display: "flex" }}
                                    >
                                      <div className="block-left">
                                        <i className="fa fa-bookmark mr-2" />
                                        <i className="fa fa-arrow-up mr-2" />
                                        <p className="font-light inline text-blue-400">
                                          {task.priorityTask.priority}
                                        </p>
                                      </div>
                                      <div className="block-right">
                                        <div
                                          className="avatar-group"
                                          style={{ display: "flex" }}
                                        >
                                          {task.assigness?.map((mem, index) => {
                                            return (
                                              <div
                                                key={index}
                                                className="avatar"
                                              >
                                                <img
                                                  src={mem.avatar}
                                                  alt={mem.avatar}
                                                />
                                              </div>
                                            );
                                          })}
                                          {/* <div className="avatar">
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
                          </div> */}
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    </div>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container">
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

      <ModalCyberBugs show={show} handleClose={handleClose}/>
    </div>
  );
}
