import { handleActions } from 'redux-actions';

import { fillTasks } from './actions';

const initialState = { tasks: []};

export const tasksReducer = handleActions(
    {
        [ fillTasks ]: (state, action) => ({ ...state, tasks: action.payload }),
    },
    initialState
);
