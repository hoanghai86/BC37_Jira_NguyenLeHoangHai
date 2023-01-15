import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsServices";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

function* createProjectSaga(action) {

    console.log("create project action",action)


  //hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  //gọi api lấy dữ liệu về
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );

    //Gọi api thành công thì dispath lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS)
    //   yield put({
    //     type: "",
    //     data: data.content,
    //   });
    console.log(data);

  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga);
}
