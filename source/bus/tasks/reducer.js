import { handleActions } from 'redux-actions';

import { fillTasks, addTask } from './actions';

const initialState = [];

export const tasksReducer = handleActions(
    {
        [ fillTasks ]: (state, action) => [ ...state, ...action.payload ],
        [ addTask ]:   (state, action) => [ ...state, action.payload ],
    },
    initialState
);
