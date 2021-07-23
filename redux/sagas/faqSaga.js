import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import type from '../actions/actionTypes';
import API from '../../requests/API';
import { APIConfig } from '../../requests/ApiConfig';
import _ from 'lodash';
import service from 'services/siteService';
import siteService from 'services/siteService';

function* searchFAQ({ param }) {
    try {
        const response = yield service.searchArticle({ param });
        // console.log(response);
        if (response && response.status === 200) {
            yield put({
                type: type.SEARCH_FAQ_SUCCESS,
                data: response.data,
            });
        } else {
            yield put({
                type: type.SEARCH_FAQ_FAILED,
                message: response ? response.message : '',
            });
        }
    } catch (error) {
        yield put({
            type: type.SEARCH_FAQ_SUCCESS,
            message: error,
        });
    }
}

function* getListFAQ({ cate }) {
    let response = yield API.requestGetAPI(APIConfig.GET_LIST_FAQ, {
        cate,
    });

    if (response && response.status === 200) {
        yield put({
            type: type.GET_LIST_FAQ_SUCCESS,
            data: response.data,
        });
    } else {
        // show message
        yield put({
            type: type.GET_LIST_FAQ_FAILED,
            message: response ? response.message : '',
        });
    }
}

export default function* watcherFAQSaga() {
    yield takeLatest(type.SEARCH_FAQ, searchFAQ);
    yield takeLatest(type.GET_LIST_FAQ, getListFAQ);
}
