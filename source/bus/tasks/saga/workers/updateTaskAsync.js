// core
import { put, call } from 'redux-saga/effects';

//instruments
import { api } from '../../../../REST/index';
import { upadteTask } from '../../actions';
import { startFetching, stopFetching, emitError } from '../../../ui/actions';

export function* updateTasksAsync (action) {
    try {
        yield put(startFetching());

        const response = yield call(api.updateTask, action.payload);

        yield put(upadteTask(response));
    } catch (error) {
        console.log(error);
        yield put(emitError(error, 'fetchTasksAsync'));
    } finally {
        yield put(stopFetching());
    }
}
