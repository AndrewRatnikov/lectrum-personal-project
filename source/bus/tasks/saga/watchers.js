// Core
import { takeEvery } from 'redux-saga/effects';

// Workers
import {
    fetchTasksAsync,
    createTasksAsync,
    deleteTasksAsync,
    updateTasksAsync
} from './workers';

// consts
import {
    FETCH_TASKS_ASYNC,
    CREATE_TASK_ASYNC,
    DELETE_TASK_ASYNC,
    UPDATE_TASK_ASYNC
} from '../constants';

export function* watchTasks () {
    yield takeEvery(FETCH_TASKS_ASYNC, fetchTasksAsync);
    yield takeEvery(CREATE_TASK_ASYNC, createTasksAsync);
    yield takeEvery(DELETE_TASK_ASYNC, deleteTasksAsync);
    yield takeEvery(UPDATE_TASK_ASYNC, updateTasksAsync);
}
