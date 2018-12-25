import { createAction } from 'redux-actions';

import { FETCH_TASKS_ASYNC, FILL_TASKS } from './constants';

export const fetchTasksAsync = createAction(FETCH_TASKS_ASYNC);

export const fillTasks = createAction(FILL_TASKS);
