import axios from "axios";
import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  ADD_TASK_API,
  GET_TASKLIST_API,
  GET_TASK_API,
  DELETE_TASK_API,
  CHECK_TASK_API,
  REJECT_TASK_API,
} from "../constants/ToDoListConst";
import { toDoListService } from "../../services/ToDoListService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
/* redux có 2 loại Action
Loại 1: action trả về 1 object (action thường)
Loai 2: action trả về 1 function (thường dùng để xử lý API hoặc gọi các action khác)
*/

/* 
    08/01/2023 Hải viết chức năng getTask
    Action saga lấy danh sách task từ api
*/
function* getTaskApiAction(action) {
  //put giống dispatch action
  yield put({
    type: DISPLAY_LOADING,
  });

  try {
    let { data, status } = yield call(toDoListService.getTaskApi);
    yield delay(1000);
    if (status === STATUS_CODE.SUCCESS) {
      //sau khi lấy giá trị thành công, dùng PUT (giống dispatch bên Thunk)
      yield put({
        type: GET_TASK_API,
        taskList: data,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiActionGetTaskApi() {
  yield takeLatest(GET_TASKLIST_API, getTaskApiAction);
}

/* 
    08/01/2023 Hải viết chức năng addTask
    Action saga thực hiện nghiệp vụ thêm danh sách task từ api
*/

function* addTaskApiAction(action) {
  const { taskName } = action;

  //Gọi api
  try {
    const { data, status } = yield call(() => {
      return toDoListService.addTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log(err);
  }

  //Hiển thị loading
  //thành công thì load lại task bằng cách gọi lại action saga load tasklist
}

export function* theoDoiActionAddTaskApi() {
  yield takeLatest(ADD_TASK_API, addTaskApiAction);
}

/* 
    08/01/2023 Hải viết chức năng deleteTask
    Action saga thực hiện nghiệp vụ xóa danh sách task từ api
*/

function* deleteTaskApi(action) {
  const { taskName } = action;
  try {
    //Gọi api delete task
    const { data, status } = yield call(() => {
      return toDoListService.deleteTaskApi(taskName);
    });
    //Nếu thành công thì gọi lại action GET_TASKLIST_API (action saga thực thi)
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiActionDeleteTask() {
  yield takeLatest(DELETE_TASK_API, deleteTaskApi);
}

/*   
  08/01/2023 Hải viết chức năng doneTask
  Action saga thực hiện chức năng doneTask
*/

function* checkDoneTaskApi(action) {
  const { taskName } = action;
  try {
    const { data, status } = yield call(() => {
      return toDoListService.checkDoneTask(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiDoneTask() {
  yield takeLatest(CHECK_TASK_API,checkDoneTaskApi);
}

/*   
  08/01/2023 Hải viết chức năng rejectTask
  Action saga thực hiện chức năng rejectTask
*/

function* rejectTaskApi(action){
  const {taskName} = action;
  try {
    const { data, status } = yield call(() => {
      return toDoListService.rejectTask(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiRejectTask(){
  yield takeLatest(REJECT_TASK_API, rejectTaskApi)
}