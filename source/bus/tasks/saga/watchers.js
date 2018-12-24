// Core
import { takeEvery } from 'redux-saga/effects';

// Workers
import { fetchTasksAsync } from './workers';

// consts
import { FETCH_TASKS_ASYNC } from '../constants';

export function* watchTasks () {
    yield takeEvery(FETCH_TASKS_ASYNC, fetchTasksAsync);
}
