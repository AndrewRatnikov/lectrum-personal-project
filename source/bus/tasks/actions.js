import { createActions } from 'redux-actions';

import { FETCH_TASKS_ASYNC, FILL_TASKS } from './constants';

export const fetchTasksAsync = createActions(FETCH_TASKS_ASYNC);

export const fillTasks = createActions(FILL_TASKS);
