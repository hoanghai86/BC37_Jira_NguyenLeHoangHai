import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/Cyberbugs/PriorityConstants";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/Cyberbugs/StatusConstant";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  DELETE_TASK_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
  UPDATE_STATUS_TASK_SAGA,
} from "../../../redux/constants/Cyberbugs/TaskConstants";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constants/Cyberbugs/TaskTypeConstants";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Input, Select } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import {
  DELETE_COMMENT_TASK_SAGA,
  INSERT_COMMENT_TASK_SAGA,
  UPDATE_COMMENT_TASK_SAGA,
} from "../../../redux/constants/Cyberbugs/CommentConstant";
const { Option } = Select;

// import { Button, Modal } from 'antd';

export default function ModalCyberBugs({ show, handleClose }, props) {
  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);

  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [visibleEditorComment, setVisibleEditorComment] = useState(false);
  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  const [content, setContent] = useState(taskDetailModal.description);

  const [form] = Form.useForm();
  const formRef = useRef(null);

  const onFillEditComment = (user) => {
    console.log(user);
      formRef.current?.setFieldsValue({
        id: user.id,
        editComment: user.commentContent,
      });
   
  };

  const onResetEditComment = () => {
    formRef.current?.resetFields();
  };

  const onFinish = (values) => {
    dispatch({
      type: UPDATE_COMMENT_TASK_SAGA,
      updateComment: {
        id: values.id,
        contentComment: values.editComment,
      },
      taskId: taskDetailModal.taskId,
    });
    setVisibleEditorComment(false);

  };

  const handleUpdateComment = (values) => {
    dispatch({
      type: UPDATE_COMMENT_TASK_SAGA,
      updateComment: {
        id: values.id,
        contentComment: values.editComment,
      },
      taskId: taskDetailModal.taskId,
    });
  }

  const handleComment = (e) => {
    const { taskId } = taskDetailModal;
    const contentComment = e.target.value;
    dispatch({
      type: INSERT_COMMENT_TASK_SAGA,
      commentObject: {
        taskId,
        contentComment,
      },
    });
    form.resetFields();
  };
  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
  }, []);

  console.log("taskDetailModal", taskDetailModal);
  // console.log("arrStatus", arrStatus);

  const parse = require("html-react-parser");

  const {
    values,
    touched,
    errors,
    // handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  const renderDescription = () => {
    const jsxDescription = parse(`<p>${taskDetailModal.description}</p>`);

    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              name="description"
              initialValue={taskDetailModal.description}
              init={{
                selector: "textarea#myTextArea",
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <div className="text-right mt-2">
              <button
                className="btn btn-primary btn-sm mr-2 w-20"
                onClick={() => {
                  dispatch({
                    type: HANDLE_CHANGE_POST_API_SAGA,
                    actionType: CHANGE_TASK_MODAL,
                    name: "description",
                    value: content,
                  });

                  // dispatch({
                  //   type: CHANGE_TASK_MODAL,
                  //   name: 'description',
                  //   value: content,
                  // })
                  setVisibleEditor(false);
                }}
              >
                Save
              </button>
              <button
                className="btn btn-secondary btn-sm w-20"
                onClick={() => {
                  dispatch({
                    type: HANDLE_CHANGE_POST_API_SAGA,
                    actionType: CHANGE_TASK_MODAL,
                    name: "description",
                    value: historyContent,
                  });

                  // dispatch({
                  //   type: CHANGE_TASK_MODAL,
                  //   name: "description",
                  //   value: historyContent,
                  // })
                  setVisibleEditor(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setHistoryContent(taskDetailModal.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

 
  const renderComment = () => {
    const jsxComment = taskDetailModal.lstComment
      ?.map((user, index) => {
        return (
          <div key={index}>
            <div className="lastest-comment">
              <div className="comment-item">
                <div className="display-comment" style={{ display: "flex" }}>
                  <div className="avatar" >
                    <img
                      // src={require("../../../assets/img/download (1).jfif")}
                      src={user.avatar}
                      alt=""                     
                    />
                  </div>
                  <div className="w-full">
                    <p style={{ marginBottom: 5 }}>{user.name}</p>
                    <div style={{ marginBottom: "auto" }} className="break-all">
                      <div>{user.commentContent}</div>
                    </div>
                    <Button
                      type="link"
                      htmlType="button"
                      onClick={() => {
                        setVisibleEditorComment(true);
                        onFillEditComment(user);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      type="link"
                      onClick={() => {
                        dispatch({
                          type: DELETE_COMMENT_TASK_SAGA,
                          commentObject: {
                            taskId: taskDetailModal.taskId,
                            idComment: user.id,
                            idUser: user.idUser,
                          },
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });

    return <div>{jsxComment}</div>;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_MODAL,
      name,
      value,
    });

    // dispatch({
    //   type: CHANGE_TASK_MODAL,
    //   name,
    //   value,
    // });
  };

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="logged">{Number(timeTrackingSpent)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h estimated
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              type="number"
              min="0"
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              type="number"
              min="0"
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            />
          </div>
        </div>
      </>
    );
  };



  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Body scrollable="true">
          <div
          // className="modal fade"
          // id="infoModal"
          // tabIndex={-1}
          // role="dialog"
          // aria-labelledby="infoModal"
          // aria-hidden="true"
          >
            <div className="modal-info" style={{ fontSize: "smaller" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <div className="task-title">
                    <i className="fa fa-bookmark" />
                    <select
                      style={{ display: "inline", width: "initial" }}
                      className="form-control ml-1"
                      name="typeId"
                      value={taskDetailModal.typeId}
                      onChange={handleChange}
                    >
                      {arrTaskType?.map((tp, index) => {
                        return (
                          <option key={index} value={tp.id}>
                            {tp.taskType}
                          </option>
                        );
                      })}
                    </select>
                    <span className="text-2xl font-semibold">
                      {taskDetailModal?.taskName}
                    </span>
                  </div>
                  <div style={{ display: "flex" }} className="task-click">
                    <div>
                      <i className="fab fa-telegram-plane" />
                      <span style={{ paddingRight: 20 }}>Give feedback</span>
                    </div>
                    <div>
                      <i className="fa fa-link" />
                      <span style={{ paddingRight: 20 }}>Copy link</span>
                    </div>
                    <div
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => {
                        const action = {
                          type: DELETE_TASK_SAGA,
                          projectId: taskDetailModal.projectId,
                          taskId: taskDetailModal.taskId,
                        };
                        dispatch(action);
                        handleClose();
                      }}
                    >
                      <i className="fa fa-trash-alt text-sm" />
                      Delete Task
                    </div>
                    <div>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClose}
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-8">
                        <p className="issue">This is an issue of type: Task.</p>
                        <div className="description">
                          <p>Description</p>
                          {renderDescription()}

                          {/* <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Esse expedita quis vero tempora error sed
                            reprehenderit sequi laborum, repellendus quod
                            laudantium tenetur nobis modi reiciendis sint
                            architecto. Autem libero quibusdam odit assumenda
                            fugiat? Beatae aliquid labore vitae obcaecati
                            sapiente asperiores quia amet id aut, natus quo
                            molestiae quod voluptas, temporibus iusto laudantium
                            sit tempora sequi. Rem, itaque id, fugit magnam
                            asperiores voluptas consectetur aliquid vel error
                            illum, delectus eum eveniet laudantium at
                            repudiandae!
                          </p>
                          <div style={{ fontWeight: 500, marginBottom: 10 }}>
                            Jira Software (software projects) issue types:
                          </div>
                          <div className="title">
                            <div className="title-item">
                              <h3>
                                BUG <i className="fa fa-bug" />
                              </h3>
                              <p>
                                A bug is a problem which impairs or prevents the
                                function of a product.
                              </p>
                            </div>
                            <div className="title-item">
                              <h3>
                                STORY <i className="fa fa-book-reader" />
                              </h3>
                              <p>
                                A user story is the smallest unit of work that
                                needs to be done.
                              </p>
                            </div>
                            <div className="title-item">
                              <h3>
                                TASK <i className="fa fa-tasks" />
                              </h3>
                              <p>
                                A task represents work that needs to be done
                              </p>
                            </div>
                          </div> */}
                        </div>

                        {/* ********************************************RENDER COMMENT******************************** */}
                        <div className="comment outline outline-gray-200 outline-offset-[10px] outline-1 mt-16">
                          <h6>Comment</h6>
                          {renderComment()}

                          <div
                            className="block-comment"
                            style={{ display: "flex" }}
                          >
                            <div className="avatar">
                              <CommentOutlined
                                style={{ fontSize: "30px", color: "#ced4da" }}
                              />
                              {/* <img
                                src={require("../../../assets/img/download (1).jfif")}    
                                alt=""
                              /> */}
                            </div>
                            <div className="input-comment">
                              <Form
                                onFinish={onFinish}
                                form={form}
                                ref={formRef}
                              >
                                {visibleEditorComment ? (
                                  <div>
                                    <Form.Item name="editComment">
                                      <Input
                                        placeholder="Edit a comment..."
                                        onPressEnter={handleUpdateComment}
                                        autoFocus
                                      />
                                    </Form.Item>

                                  <div className="text-right">
                                    <Form.Item>
                                      <Button
                                        type="link"
                                        htmlType="submit"
                                        onClick={handleUpdateComment}
                                      >
                                        Save
                                      </Button>
                                      <Button
                                        type="link"
                                        onClick={() => {
                                          setVisibleEditorComment(false);
                                          onResetEditComment();
                                        }}
                                      >
                                        Close
                                      </Button>

                                      <Form.Item name="id">
                                        <Input
                                          placeholder="Edit a ID..."
                                          type="hidden"
                                        />
                                      </Form.Item>
                                    </Form.Item>
                                  </div>
                                    
                                  </div>
                                ) : (
                                  <Form.Item name="contentComment">
                                    <Input
                                      placeholder="Add a comment..."
                                      onPressEnter={handleComment}
                                      autoFocus
                                      
                                    />
                                  </Form.Item>
                                )}
                              </Form>

                              {/* <input
                                type="text"
                                placeholder="Add a comment ..."
                                className="form-control"
                              /> */}
                              <p>
                                <span
                                  style={{ fontWeight: 500, color: "gray" }}
                                >
                                  Protip:
                                </span>
                                <span>
                                  press
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      background: "#ecedf0",
                                      color: "#b4bac6",
                                    }}
                                  >
                                    M
                                  </span>
                                  to comment
                                </span>
                              </p>
                            </div>
                          </div>

                          {/* {taskDetailModal.lstComment
                            ?.reverse()
                            .map((user, index) => {
                              return (
                                <div key={index}>
                                  <div className="lastest-comment">
                                    <div className="comment-item">
                                      <div
                                        className="display-comment"
                                        style={{ display: "flex" }}
                                      >
                                        <div className="avatar">
                                          <img
                                            // src={require("../../../assets/img/download (1).jfif")}
                                            src={user.avatar}
                                            alt=""
                                          />
                                        </div>
                                        <div>
                                          <p style={{ marginBottom: 5 }}>
                                            {user.name}
                                          </p>
                                          <p
                                            style={{ marginBottom: "auto" }}
                                            className="break-all"
                                          >
                                            {user.commentContent}
                                          </p>
                                          <div>
                                            <Button type="link">Edit</Button>
                                            <Button
                                              type="link"
                                              onClick={() => {
                                                dispatch({
                                                  type: DELETE_COMMENT_TASK_SAGA,
                                                  commentObject: {
                                                    taskId:
                                                      taskDetailModal.taskId,
                                                    idComment: user.id,
                                                    idUser: user.idUser,
                                                  },
                                                });
                                              }}
                                            >
                                              Delete
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })} */}
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="status">
                          <h6>STATUS</h6>
                          <select
                            name="statusId"
                            className="custom-select"
                            value={taskDetailModal?.statusId}
                            onChange={(e) => {
                              // const action = {
                              //   type: UPDATE_STATUS_TASK_SAGA,
                              //   taskUpdateStatus: {
                              //     taskId: taskDetailModal.taskId,
                              //     statusId: e.target.value,
                              //     projectId: taskDetailModal.projectId,
                              //   },
                              // };

                              // console.log("action",action);
                              // console.log("taskUpdateStatus", {
                              //   taskId: taskDetailModal.taskId,
                              //   statusId: e.target.value,
                              // });

                              // dispatch(action);

                              handleChange(e);
                            }}
                          >
                            {arrStatus?.map((status, index) => {
                              return (
                                <option key={index} value={status.statusId}>
                                  {status.statusName}
                                </option>
                              );
                            })}
                            {/* <option selected>SELECTED FOR DEVELOPMENT</option>
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option> */}
                          </select>
                        </div>
                        <div className="assignees">
                          <h6>ASSIGNEES</h6>
                          <div className="row">
                            {taskDetailModal.assigness?.map((user, index) => {
                              return (
                                <div
                                  key={index}
                                  className="col-md-auto mb-2  cursor-pointer"
                                  onClick={() => {
                                    dispatch({
                                      type: HANDLE_CHANGE_POST_API_SAGA,
                                      actionType: REMOVE_USER_ASSIGN,
                                      userId: user.id,
                                    });

                                    // dispatch({
                                    //   type: REMOVE_USER_ASSIGN,
                                    //   userId: user.id,
                                    // });
                                  }}
                                >
                                  <div
                                    style={{ display: "flex" }}
                                    className="item"
                                  >
                                    <div className="avatar">
                                      <img
                                        src={user.avatar}
                                        alt={user.avatar}
                                      />
                                    </div>
                                    <p className="name mt-1 ml-1">
                                      {user.name}
                                      <i
                                        className="fa fa-times"
                                        style={{ marginLeft: 5 }}
                                      />
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                            <div className="col-md-auto mb-3">
                              <i
                                className="fa fa-plus"
                                style={{ marginRight: 5 }}
                              />
                              <span>Add more</span>
                              <Select
                                options={projectDetail.members
                                  ?.filter((mem) => {
                                    let index =
                                      taskDetailModal.assigness?.findIndex(
                                        (us) => us.id === mem.userId
                                      );
                                    if (index !== -1) {
                                      return false;
                                    }
                                    return true;
                                  })
                                  .map((mem, index) => {
                                    return {
                                      value: mem.userId,
                                      label: mem.name,
                                    };
                                  })}
                                optionFilterProp="label"
                                name="lstUser"
                                value="Select User Assign"
                                className="w-full"
                                onSelect={(value) => {
                                  if (value == "0") {
                                    return;
                                  }

                                  let userSelected = projectDetail.members.find(
                                    (mem) => mem.userId == value
                                  );
                                  userSelected = {
                                    ...userSelected,
                                    id: userSelected.userId,
                                  };

                                  dispatch({
                                    type: HANDLE_CHANGE_POST_API_SAGA,
                                    actionType: CHANGE_ASSIGNESS,
                                    userSelected,
                                  });

                                  //dispatch reducer
                                  // dispatch({
                                  //   type: CHANGE_ASSIGNESS,
                                  //   userSelected,
                                  // });

                                  /*
                                {
                                  id: 3887,
                                  avatar: "https://ui-avatars.com/api/?name=Hải",
                                  name: "Hải",
                                  alias: "hai",
                                } 
                                 */

                                  /*
                                {
                                  id: 3887,
                                  avatar: "https://ui-avatars.com/api/?name=Hải",
                                  name: "Hải",
                                  alias: "hai",
                                  id: 3887,
                                } 
                                 */
                                }}
                              ></Select>
                            </div>
                          </div>
                        </div>

                        {/* <div className="reporter">
                          <h6>REPORTER</h6>
                          <div style={{ display: "flex" }} className="item">
                            <div className="avatar">
                              <img
                                src={require("../../../assets/img/download (1).jfif")}
                                alt=""
                              />
                            </div>
                            <p className="name">
                              Pickle Rick
                              <i
                                className="fa fa-times"
                                style={{ marginLeft: 5 }}
                              />
                            </p>
                          </div>
                        </div> */}

                        <div className="priority" style={{ marginBottom: 20 }}>
                          <h6>PRIORITY</h6>
                          <select
                            name="priorityId"
                            className="custom-select"
                            value={taskDetailModal?.priorityId}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          >
                            {arrPriority?.map((item, index) => {
                              // console.log("item", item);
                              return (
                                <option key={index} value={item.priorityId}>
                                  {item.priority}
                                </option>
                              );
                            })}

                            {/* <option>Highest</option>
                            <option>Medium</option>
                            <option>Low</option>
                            <option>Lowest</option> */}
                          </select>
                        </div>
                        <div className="estimate">
                          <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                          <input
                            name="originalEstimate"
                            type="text"
                            className="estimate-hours form-control"
                            value={taskDetailModal?.originalEstimate}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </div>
                        <div className="time-tracking">
                          <h6>TIME TRACKING</h6>

                          {renderTimeTracking()}

                          {/* <div style={{ display: "flex" }}>
                            <i className="fa fa-clock" />
                            <div style={{ width: "100%" }}>
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: "25%" }}
                                  aria-valuenow={25}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <p className="logged">4h logged</p>
                                <p className="estimate-time">12h estimated</p>
                              </div>
                            </div>
                          </div> */}
                        </div>
                        <div style={{ color: "#929398" }}>
                          Create at a month ago
                        </div>
                        <div style={{ color: "#929398" }}>
                          Update at a few seconds ago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
