import { call, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsServices";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../constants/Cyberbugs/Cyberbugs";

function* getAllProjectCategorySaga(action) {
  //gọi api lấy dữ liệu về
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getAllProjectCategory()
    );

    //Gọi api thành công thì dispath lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS)
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
        data: data.content,
      });

  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiGetAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}
