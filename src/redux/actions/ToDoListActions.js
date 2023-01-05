import axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConst";

export const getTaskListApi = () => {
  //tiền xử lý dữ liệu => xử lý function

  return (dispatch) => {
    let promise = axios({
      url: "https://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    promise.then((result) => {
      console.log(result.data);

      dispatch({
        type: GET_TASK_API,
        taskList: result.data,
      });

      console.log("thành công");
    });
    promise.catch((err) => {
      console.log("thất bại");
      console.log(err.response.data);
    });
  };
};

export const addTaskApi = (taskName) => {
  return (dispatch) => {
    //Xử lý trước khi dispatch
    let promise = axios({
      url: "https://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: taskName },
    });

    //Xử lý thành công
    promise.then((result) => {
      // alert(result.data);
      dispatch(getTaskListApi());
    });

    //Xử lý thất bại
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
};

export const deleteTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });

    promise.then((result) => {
      //Sau khi thực hiện API gọi phương thức dispatchAction get TaskList để load lại task
      dispatch(getTaskListApi());
    });

    promise.catch((errors) => {
      alert(errors.reponse.data);
    });
  };
};

export const checkTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((res) => {
      dispatch(getTaskListApi());
    });

    promise.catch((err) => {
      alert(err.response.data);
    });
  };
};

export const rejectTaskApi = (taskName) => {
  return (dispatch) =>{
    let promise = axios({
      url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
  
    promise.then((res) => {
      dispatch(getTaskListApi());
    });
  
    promise.catch((err) => {
      alert(err.response.data);
    });
  }
};
