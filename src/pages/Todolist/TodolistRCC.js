import React, { Component } from "react";
import Axios from "axios";
import style from "./Todolist.css";

export default class TodolistRCC extends Component {
  state = {
    taskList: [],
    values:{
      taskName:'',
    },
    errors:{
      taskName:''
    }
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

  //Hàm sẽ tự động thực thi sau khi nội dung component được render
  componentDidMount(){
    this.getTaskList();
  }

  handleChange = (e) =>{
    let{value, name} = e.target;
    // console.log(value, name);
    let newValues = {...this.state.values};

    newValues = {...newValues,[name]:value}

    let newErrors = {...this.state.errors};

    let regexString = /^[a-z A-Z]+$/;

    if(!regexString.test(value) || value.trim()===''){
      newErrors[name] = name + ' invalid !';
    }else{
      newErrors[name] = '';
    }


    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors,
    })
  }

  addTask=(e)=>{
    e.preventDefault(); //Dừng sự kiện submit form

   let promise = Axios({
      url: "https://svcy.myclass.vn/api/ToDoList/AddTask",
      method:"POST",
      data: {taskName:this.state.values.taskName}
    });
    console.log(promise.data)

    //Xử lý thành công
    promise.then(result=>{
      // alert(result.data);
      this.getTaskList();
    })

    //Xử lý thất bại
    promise.catch(errors =>{
      alert(errors.response.data)
    })
  }

  render() {
    return (
      <form onSubmit={this.addTask}>
        {/* <button
          onClick={() => {
            this.getTaskList();
          }}
        >
          Get task list
        </button> */}
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
                <input name="taskName" onChange={this.handleChange}
                  id="newTask"
                  type="text"
                  placeholder="Enter an activity..."
                />
                
                <button id="addItem" onClick={this.addTask}>
                  <i className="fa fa-plus" />
                </button>             
              </div>
              <p className="text-red-600">{this.state.errors.taskName}</p>
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
      </form>
    );
  }
}
