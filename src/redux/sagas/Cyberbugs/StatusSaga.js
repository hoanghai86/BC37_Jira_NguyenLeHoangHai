import { call, delay, put, takeLatest } from "redux-saga/effects";
import { statusService } from "../../../services/StatusService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from "../../constants/Cyberbugs/StatusConstant";

function* getAllStatusSaga(action) {
  try {
    const { data, status } = yield call(() => statusService.getAllStatus());
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
    }
    yield put({
      type: GET_ALL_STATUS,
      arrStatus: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiGetAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}
