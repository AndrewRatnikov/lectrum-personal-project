import { handleActions } from 'redux-actions';

import { fillTasks } from './actions';

const initialState = [];

export const tasksReducer = handleActions(
    {
        [ fillTasks ]: (state, action) => ({ ...state, ...action.payload }),
    },
    initialState
);
