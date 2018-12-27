// core
import { put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';

//instruments
import { api } from '../../../../REST/index';
import { upadteTask } from '../../actions';
import { startFetching, stopFetching, emitError } from '../../../ui/actions';

export function* updateTasksAsync (action) {
    try {
        yield put(startFetching());

        const response = yield call(api.updateTask, action.payload.toJSON());

        yield put(upadteTask(fromJS(response)));
    } catch (error) {
        console.log(error);
        yield put(emitError(error, 'fetchTasksAsync'));
    } finally {
        yield put(stopFetching());
    }
}
