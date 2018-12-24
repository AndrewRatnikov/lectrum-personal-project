// core
import { put, call } from 'redux-saga/effects';

//instruments
import { api } from '../../../../REST/index';
import { fillTasks } from '../../actions';
import { startFetching, stopFetching, emitError } from '../../../ui/actions';

export function* fetchTasksAsync () {
    try {
        yield put(startFetching());

        const response = yield call(api.fetchTasks);

        if (response.status !== 200) {
            throw new Error('users were not fetched.');
        }

        const tasks = yield call(response, response.json);

        yield put(fillTasks(tasks));
    } catch (error) {
        yield put(emitError(error, 'fetchTasksAsync'));
    } finally {
        yield put(stopFetching());
    }
}
