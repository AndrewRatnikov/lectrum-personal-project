// core
import { put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';

//instruments
import { api } from '../../../../REST/index';
import { fillTasks } from '../../actions';
import { startFetching, stopFetching, emitError } from '../../../ui/actions';

export function* fetchTasksAsync () {
    try {
        yield put(startFetching());

        const response = yield call(api.fetchTasks);

        yield put(fillTasks(fromJS(response)));
    } catch (error) {
        console.log(error);
        yield put(emitError(error, 'fetchTasksAsync'));
    } finally {
        yield put(stopFetching());
    }
}
