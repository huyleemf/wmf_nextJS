import { put, takeEvery, takeLatest } from "redux-saga/effects";
import type from "../actions/actionTypes";
import API from "../../requests/API";
import { APIConfig } from "../../requests/ApiConfig";
import _ from "lodash";
import service from "services/siteService";
import siteService from "services/siteService";

function* sendForm({ param }) {
  try {
    const response = yield service.sendForm({ param });
    // console.log(response);
    if (response && response.status === 200) {
      yield put({
        type: type.SEND_FORM_SUCCESS,
        data: response.data,
      });
    } else {
      yield put({
        type: type.SEND_FORM_FAILED,
        message: response ? response.message : "",
      });
    }
  } catch (error) {
    yield put({
      type: type.SEND_FORM_FAILED,
      message: error,
    });
  }
}

export default function* watcherSendFormSaga() {
  yield takeLatest(type.SEND_FORM, sendForm);
}
