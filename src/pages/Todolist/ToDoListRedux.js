import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTaskApi,
  checkTaskApi,
  deleteTaskApi,
  getTaskListApi,
  rejectTaskApi,
} from "../../redux/actions/ToDoListActions";

export default function ToDoListRedux() {
  //lấy tasklist từ redux về
  const { taskList } = useSelector((state) => {
    return state.ToDoListReducer;
  });
  // console.log(taskList);

  const dispatch = useDispatch();

  let [state, setState] = useState({
    // taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  const handleChange = (e) => {
    let { value, name } = e.target;
    // console.log(value, name);
    let newValues = { ...state.values };

    newValues = { ...newValues, [name]: value };

    let newErrors = { ...state.errors };

    let regexString = /^[a-z A-Z]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid !";
    } else {
      newErrors[name] = "";
    }

    setState({
      ...state,
      values: newValues,
      errors: newErrors,
    });
  };

  const getTaskList = () => {
    dispatch(getTaskListApi());
  };

  const addTask = (e) => {
    e.preventDefault(); //chặn sự kiện reload lại trang

    //Xử lý nhận dữ liệu từ người dùng nhập => gọi action addTaskApi
    dispatch(addTaskApi(state.values.taskName));
  };

  //Xử lý reject task
  const rejectTask = (taskName) => {
    dispatch(rejectTaskApi(taskName));
  };

  //Xử lý done task
  const checkTask = (taskName) => {
    dispatch(checkTaskApi(taskName));
  };

  //hàm xử lý xóa task
  const delTask = (taskName) => {
    dispatch(deleteTaskApi(taskName));
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const renderTaskToDo = () => {
    return taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                type="button"
                className="remove"
                onClick={() => {
                  delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  checkTask(item.taskName);
                }}
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  const renderTaskToDoDone = () => {
    return taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  rejectTask(item.taskName);
                }}
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };

  return (
    <div>
      <div className="card">
        <div className="card__header">
          <img src={require("./bg.png")} />
        </div>
        {/* <h2>hello!</h2> */}
        <form className="card__body" onSubmit={addTask}>
          <div className="card__content">
            <div className="card__title">
              <h2>My Tasks</h2>
              <p>September 9,2020</p>
            </div>
            <div className="card__add">
              <input
                id="newTask"
                name="taskName"
                type="text"
                placeholder="Enter an activity..."
                onChange={handleChange}
              />
              <button id="addItem" type="submit" onClick={addTask}>
                <i className="fa fa-plus" />
              </button>
            </div>
            <div className="card__todo">
              {/* Uncompleted tasks */}
              <ul className="todo" id="todo">
                {renderTaskToDo()}
              </ul>
              {/* Completed tasks */}
              <ul className="todo" id="completed">
                {renderTaskToDoDone()}

                {/* {taskList
                  ?.filter((item) => item.status)
                  .map((item, index) => {
                    return (
                      <li key={index}>
                        <span>{item.taskName}</span>
                        <div className="buttons">
                          <button
                            className="remove"
                            type="button"
                            onClick={() => {
                              delTask(item.taskName);
                            }}
                          >
                            <i className="fa fa-trash-alt" />
                          </button>
                          <button
                            type="button"
                            className="complete"
                            onClick={() => {
                              rejectTask(item.taskName);
                            }}
                          >
                            <i className="far fa-check-circle" />
                            <i className="fas fa-undo" />
                          </button>
                        </div>
                      </li>
                    );
                  })} */}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
