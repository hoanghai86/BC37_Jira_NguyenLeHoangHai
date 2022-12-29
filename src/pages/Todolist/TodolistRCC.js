import React, { Component } from "react";
import Axios from "axios";
import style from "./Todolist.css";

export default class TodolistRCC extends Component {
  state = {
    taskList: [],
  };
  getTaskList = () => {
    let promise = Axios({
      url: "https://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    promise.then((result) => {
      console.log(result.data);
      this.setState({
        taskList: result.data,
      });
    });
    promise.catch((err) => {
      console.log(err.response.data);
      console.log("thất bại");
    });
  };

  renderTaskToDo = () => {
    return this.state.taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove">
                <i className="fa fa-trash-alt" />
              </button>
              <button className="complete">
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  renderTaskToDoDone = () => {
    return this.state.taskList.filter(item=>item.status).map((item,index)=>{
      return (
        <li key={index}>
          <span>{item.taskName}</span>
          <div className="buttons">
            <button className="remove">
              <i className="fa fa-trash-alt" />
            </button>
            <button className="complete">
              <i className="far fa-check-circle" />
              <i className="fas fa-check-circle" />
            </button>
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.getTaskList();
          }}
        >
          Get task list
        </button>
        <div className="card">
          <div className="card__header">
            <img src={require("./bg.png")} />
          </div>
          {/* <h2>hello!</h2> */}
          <div className="card__body">
            <div className="card__content">
              <div className="card__title">
                <h2>My Tasks</h2>
                <p>September 9,2020</p>
              </div>
              <div className="card__add">
                <input
                  id="newTask"
                  type="text"
                  placeholder="Enter an activity..."
                />
                <button id="addItem">
                  <i className="fa fa-plus" />
                </button>
              </div>
              <div className="card__todo">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskToDo()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskToDoDone()}

                  {/* <li>
                    <span>Ăn sáng</span>
                    <div className="buttons">
                      <button className="remove">
                        <i className="fa fa-trash-alt" />
                      </button>
                      <button className="complete">
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                      </button>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
