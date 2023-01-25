import { call, delay, put, takeLatest } from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import {
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  UPDATE_STATUS_TASK_SAGA,
} from "../../constants/Cyberbugs/TaskConstants";

function* createTaskSaga(action) {
  //hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );
    //Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
    }
    notifiFunction("success", "Create task successfully !");
    yield put({
      type: "CLOSE_DRAWER",
    });
  } catch (error) {
    console.log(error.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateTaskSaga() {
  yield takeLatest("CREATE_TASK_SAGA", createTaskSaga);
}

/* -------------------------------------------------- */

function* getTaskDetailSaga(action) {
  const { taskId } = action;
  try {
    const { data, status } = yield call(() =>
      taskService.getTaskDetail(taskId)
    );

    yield put({
      type: GET_TASK_DETAIL,
      taskDetailModal: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

/* update task-------------------------------------------------- */
function* updateTaskStatusSaga(action) {
  const { taskUpdateStatus } = action;
  try {
    //cập nhật lại api status cho task hiện tại (task đang mở modal)
    const { data, status } = yield call(() =>
      taskService.updateStatusTask(taskUpdateStatus)
    );

    //Sau khi thành công thì gọi lại get project detail saga để sắp xếp lại thông tin các task
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_DETAIL",
        projectId: taskUpdateStatus.projectId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateStatus.taskId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiUpdateTaskStatusSaga(){
  yield takeLatest (UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga)
}