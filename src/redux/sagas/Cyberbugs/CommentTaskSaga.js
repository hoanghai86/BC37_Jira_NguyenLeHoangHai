import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { commentTaskService } from "../../../services/CommentTaskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DELETE_COMMENT_TASK_SAGA, INSERT_COMMENT_TASK_SAGA } from "../../constants/Cyberbugs/CommentConstant";
import { GET_TASK_DETAIL_SAGA } from "../../constants/Cyberbugs/TaskConstants";


/* ----------------------------- */
function* insertCommentTaskSaga(action) {
  const { taskId } = action.commentObject;
  try {
    const { data, status } = yield call(() => 
      commentTaskService.insertCommentTask(action.commentObject)
    );
    if(status === STATUS_CODE.SUCCESS){
        console.log("insert comment", data);
        yield put({
            type: GET_TASK_DETAIL_SAGA,
            taskId: taskId,
        })
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiInsertCommentTaskSaga() {
  yield takeLatest(INSERT_COMMENT_TASK_SAGA, insertCommentTaskSaga);
}

/* ----------------------------- */
function* deleteCommentTaskSaga(action) {
  const { taskId, idComment } = action.commentObject;
  // console.log(taskId, idComment)
  try {
    const { data, status } = yield call(() =>
      commentTaskService.deleteCommentTask(idComment)
    );
    if (status === STATUS_CODE.SUCCESS) {
      console.log("delete comment", data);
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiDeleteCommentTaskSaga(){
  yield takeLatest(DELETE_COMMENT_TASK_SAGA, deleteCommentTaskSaga);
}