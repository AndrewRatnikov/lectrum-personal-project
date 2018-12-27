// core
import { put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';

//instruments
import { api } from '../../../../REST/index';
import { addTask } from '../../actions';
import { startFetching, stopFetching, emitError } from '../../../ui/actions';

export function* createTasksAsync (action) {
    try {
        yield put(startFetching());

        const response = yield call(api.createTask, action.payload);

        yield put(addTask(fromJS(response)));
    } catch (error) {
        console.log(error);
        yield put(emitError(error, 'fetchTasksAsync'));
    } finally {
        yield put(stopFetching());
    }
}
