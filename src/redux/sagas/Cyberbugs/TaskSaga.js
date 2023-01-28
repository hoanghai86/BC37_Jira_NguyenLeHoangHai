import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  DELETE_TASK_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
  UPDATE_STATUS_TASK_SAGA,
  UPDATE_TASK_SAGA,
} from "../../constants/Cyberbugs/TaskConstants";
import { history } from "../../../util/history";



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
    yield put({
      type: "GET_PROJECT_DETAIL",
      projectId: data.content.projectId,
    })
    
  } catch (error) {
    console.log(error.response.data);
    alert("Fail! Only project creators can create tasks!");
    yield put({
      type: "CLOSE_DRAWER",
    });
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateTaskSaga() {
  yield takeLatest("CREATE_TASK_SAGA", createTaskSaga);
}

/* -------------------------------------------------- */
function* deleteTaskSaga(action) {
  const { projectId, taskId } = action;
  console.log({ projectId, taskId });
  try {
    const { data, status } = yield call(() => {
      return taskService.deleteTask(taskId);
    });
    if (status === STATUS_CODE.SUCCESS){
      console.log(data);
    notifiFunction("success", "Delete task successfully !");
      yield put({
        type: "GET_PROJECT_DETAIL",
        projectId: projectId,
      })
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiDeleteTaskSaga(){
  yield takeLatest(DELETE_TASK_SAGA, deleteTaskSaga);
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

/* update status task-------------------------------------------------- */
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



/* update task-------------------------------------------------- */

function* handleChangePostApi(action) {
  console.log("abc", action);
  //Gọi action làm thay đổi taskDetailModal
  switch (action.actionType) {
    case CHANGE_TASK_MODAL: {
      const { value, name } = action;
      yield put({
        type: CHANGE_TASK_MODAL,
        name,
        value,
      });
      break;
    }

    case CHANGE_ASSIGNESS: {
      const { userSelected } = action;
      yield put({
        type: CHANGE_ASSIGNESS,
        userSelected,
      });
      break;
    }

    case REMOVE_USER_ASSIGN: {
      const { userId } = action;
      yield put({
        type: REMOVE_USER_ASSIGN,
        userId,
      });
      break;
    }

    default:
      break;
  }

  //Save qua api updateTaskSaga
  //Lấy dữ liệu từ state.taskDetailModal
  let { taskDetailModal } = yield select((state) => state.TaskReducer);
  console.log("TaskDetailModal sau khi thay đổi", taskDetailModal);
  //Biến đổi dữ liệu state.taskDetailModal thành dữ liệu API cần

  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });
  const taskUpdateApi = { ...taskDetailModal, listUserAsign };

  //Gọi api đưa dữ liệu lên
  try {
    const { data, status } = yield call(() =>
      taskService.updateTask(taskUpdateApi)
    );
    if (status === STATUS_CODE.SUCCESS) {
      //Gọi 2 cái api để load lại ProjectDetail và Modal
      yield put({
        type: "GET_PROJECT_DETAIL",
        projectId: taskUpdateApi.projectId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateApi.taskId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function * theoDoiHandleChangePostApi(){
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi);
}