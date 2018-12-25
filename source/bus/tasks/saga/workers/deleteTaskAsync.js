// core
import { put, call } from 'redux-saga/effects';

//instruments
import { api } from '../../../../REST/index';
import { deleteTask } from '../../actions';
import { startFetching, stopFetching, emitError } from '../../../ui/actions';

export function* deleteTasksAsync (action) {
    try {
        yield put(startFetching());

        yield call(api.deleteTask, action.payload);

        yield put(deleteTask(action.payload));
    } catch (error) {
        console.log(error);
        yield put(emitError(error, 'fetchTasksAsync'));
    } finally {
        yield put(stopFetching());
    }
}
