import { createAction } from 'redux-actions';

import {
    FETCH_TASKS_ASYNC,
    FILL_TASKS,
    CREATE_TASK_ASYNC,
    ADD_TASK
} from './constants';

export const fetchTasksAsync = createAction(FETCH_TASKS_ASYNC);

export const fillTasks = createAction(FILL_TASKS);

export const createTaskAsync = createAction(
    CREATE_TASK_ASYNC,
    (message) => message
);

export const addTask = createAction(ADD_TASK, (message) => message);
