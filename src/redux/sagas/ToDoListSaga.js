import axios from "axios";
import { call, delay, fork, put, take, takeEvery, takeLatest } from "redux-saga/effects";
import { GET_TASK_API } from "../constants/ToDoListConst";
import { toDoListService } from "../../services/ToDoListService";
/* redux có 2 loại Action
Loại 1: action trả về 1 object (action thường)
Loai 2: action trả về 1 function (thường dùng để xử lý API hoặc gọi các action khác)
*/

function* getTaskApiAction(action) {
  let { data, status } = yield call(toDoListService.getTaskApi);
  //sau khi lấy giá trị thành công, dùng PUT (giống dispatch bên Thunk)
  yield put({
    type: GET_TASK_API,
    taskList: data,
  });
}

export function* theoDoiActionGetTaskApi() {
  yield takeLatest("getTaskApiAction", getTaskApiAction);
}