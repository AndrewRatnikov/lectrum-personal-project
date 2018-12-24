// Core
import { all } from 'redux-saga/effects';

// Watchers
import { watchTasks } from '../bus/tasks/saga/watchers';

export function* rootSaga () {
    yield all([ watchTasks() ]);
}
